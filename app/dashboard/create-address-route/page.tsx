"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import { Label } from "@/components/ui/label";

import { useEffect, useState, useTransition } from "react";
import Spinner from "@/components/Spinner";
import { toast } from "sonner";
import { createAddressRoute } from "@/actions/user";

const formSchema = z.object({
  addressRoute: z.string().min(2, {
    message: "addressRoute must be minimum 2 charecters.",
  }),
});

export default function page() {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState("");
  // 1. Define your form.

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      addressRoute: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(async () => {
      try {
        const response = await createAddressRoute(values.addressRoute);

        if (response.success) {
          setError("");
          form.reset();
          toast.success("Food Category created succussfully");
          window.location.reload();
        } else {
          setError(response.error || "An error");
        }
      } catch (error) {
        console.error(error);
        setError("An error occurred. Please try again.");
      }
    });
  }
  return (
    <div className="w-full flex flex-col h-full min-h-screen justify-center items-center">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Create Adress Routes</CardTitle>
            <CardDescription>
              Add Adress Routes here to select users when register
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <div className="flex flex-col gap-6">
                  <FormField
                    control={form.control}
                    name="addressRoute"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Adress Routes</FormLabel>
                        <FormControl>
                          <Input placeholder="from..-to.." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormMessage className="text-xs">{error}</FormMessage>
                  <div className="flex flex-col gap-3">
                    <Button
                      type="submit"
                      className="w-full bg-brand-color hover:bg-brand-color/90"
                      disabled={pending}
                    >
                      {pending ? <Spinner size="sm" /> : "Submit"}
                    </Button>
                  </div>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
