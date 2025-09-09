"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import { authenticate } from "@/actions/login";
import Spinner from "../Spinner";
const formSchema = z.object({
  email: z.string().email({
    message: "Email must be in email format.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});
export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const searchParams = useSearchParams();
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(async () => {
      try {
        const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";
        const formData = new FormData();
        formData.append("email", values.email);
        formData.append("password", values.password);
        formData.append("redirectTo", callbackUrl);
        const err = await authenticate(formData);

        if (err) {
          setError(err);
          console.log(err);
        }
      } catch (error) {
        console.error(error);
      }
    });
  }
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="flex flex-col gap-6">
                <div className="grid gap-3">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="joe@doe.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-3">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="password"
                            {...field}
                            type="password"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormMessage className="text-xs">{error}</FormMessage>
                </div>
                <div className="flex flex-col gap-3">
                  <Button type="submit" className="w-full" disabled={pending}>
                    {pending ? <Spinner size="sm"/> : "Login"}
                  </Button>
                </div>
              </div>
              <div className="mt-4 text-center text-sm">
                This email and password are created by super admin
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
