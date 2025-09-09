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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { useRouter, useSearchParams } from "next/navigation";
import { authenticate } from "@/actions/login";
import Spinner from "../Spinner";
import { createAdmin } from "@/actions/admin";
const formSchema = z.object({
  name: z.string().min(3, {
    message: "Name must be at least 3 characters.",
  }),
  email: z.string().email({
    message: "Email must be in email format.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
  role: z.enum(["super", "chef", "pack", "delivery"]),
});
export function CreateAdminForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const router = useRouter();
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    
    startTransition(async () => {
      try {
        const response = await createAdmin({
          name: values.name,
          email: values.email,
          password: values.password,
          role:values.role
        });

        if (response.success) {
          setError("");
          router.push("/dashboard")
        } else {
          setError(
            response.error || "Failed to sign up.In step 1 Please try again."
          );
        }
      } catch (error) {
        console.error(error);
        setError("An error occurred. Please try again.");
      }
    });
  }
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Create An Admin Account</CardTitle>
          <CardDescription>
            You can create an admin accoubt here and share the credential to the admin
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="flex flex-col gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Joe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Role</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a Role" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Tier</SelectLabel>
                              {["super", "chef", "pack", "delivery"].map(
                                (item, i) => (
                                  <SelectItem value={item} key={i}>
                                    {item.charAt(0).toUpperCase() +
                                      item.slice(1)}
                                  </SelectItem>
                                )
                              )}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormMessage className="text-xs">{error}</FormMessage>
                <div className="flex flex-col gap-3">
                  <Button type="submit" className="w-full bg-brand-color hover:bg-brand-color/90" disabled={pending}>
                    {pending ? <Spinner size="sm" /> : "Create"}
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
