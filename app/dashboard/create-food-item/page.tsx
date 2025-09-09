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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState, useTransition } from "react";
import Spinner from "@/components/Spinner";
import { createFoodCategory, getFoodCategories } from "@/actions/foodcategory";
import { createFoodItem } from "@/actions/foodItem";
import { toast } from "sonner";
const formSchema1 = z.object({
  foodItem: z.string().min(2, {
    message: "Food Item must be minimum 2 charecters.",
  }),
  foodCategory: z.string().min(2, {
    message: "category required.",
  }),
});
const formSchema2 = z.object({
  category: z.string().min(2, {
    message: "category must be minimum 2 charecters.",
  }),
});

export default function page() {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const [categories, setCategories] = useState<string[]>([]);
  // 1. Define your form.
  const form1 = useForm<z.infer<typeof formSchema1>>({
    resolver: zodResolver(formSchema1),
    defaultValues: {
      foodItem: "",
    },
  });
  const form2 = useForm<z.infer<typeof formSchema2>>({
    resolver: zodResolver(formSchema2),
    defaultValues: {
      category: "",
    },
  });

  useEffect(() => {
    startTransition(async () => {
      try {
        const response = await getFoodCategories();

        if (response.success && response.categories) {
          setCategories(response.categories);
        } else console.log(response.error);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    });
  }, []);

  function onSubmit1(values: z.infer<typeof formSchema1>) {
    startTransition(async () => {
      try {
        const response = await createFoodItem({
          foodItem: values.foodItem,
          foodCategory: values.foodCategory,
        });

        if (response.success) {
          setError("");
          form1.reset();
          toast.success("Food Item created succussfully")
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
  function onSubmit2(values: z.infer<typeof formSchema2>) {
    startTransition(async () => {
      try {
        const response = await createFoodCategory(values.category);

        if (response.success) {
          setError("");
          form2.reset();
          toast.success("Food Category created succussfully")
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
        <Tabs defaultValue="food-item">
          <TabsList>
            <TabsTrigger value="food-item">Food Item</TabsTrigger>
            <TabsTrigger value="food-category">Food Category</TabsTrigger>
          </TabsList>
          <TabsContent value="food-item">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Food Item</CardTitle>
                <CardDescription>
                  Add Food Item here to build menu
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6">
                <Form {...form1}>
                  <form
                    onSubmit={form1.handleSubmit(onSubmit1)}
                    className="space-y-8"
                  >
                    <div className="flex flex-col gap-6">
                      <FormField
                        control={form1.control}
                        name="foodItem"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Food item</FormLabel>
                            <FormControl>
                              <Input placeholder="idli." {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form1.control}
                        name="foodCategory"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Food Category</FormLabel>
                            <FormControl>
                              <Select
                                onValueChange={field.onChange}
                                value={field.value}
                              >
                                <SelectTrigger className="w-[300px]">
                                  <SelectValue placeholder="Select a Category" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectGroup>
                                    <SelectLabel>Categories</SelectLabel>
                                    {categories &&
                                      categories.map((item, i) => (
                                        <SelectItem value={item} key={i}>
                                          {item}
                                        </SelectItem>
                                      ))}
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
                          {pending ? <Spinner size="sm" /> : "Submit"}
                        </Button>
                      </div>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="food-category">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Food Category</CardTitle>
                <CardDescription>
                  Add Food Category here to build food item
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6">
                <Form {...form2}>
                  <form
                    onSubmit={form2.handleSubmit(onSubmit2)}
                    className="space-y-8"
                  >
                    <div className="flex flex-col gap-6">
                      <FormField
                        control={form2.control}
                        name="category"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Food category</FormLabel>
                            <FormControl>
                              <Input placeholder="normal.." {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormMessage className="text-xs">{error}</FormMessage>
                      <div className="flex flex-col gap-3">
                        <Button type="submit" className="w-full bg-brand-color hover:bg-brand-color/90" disabled={pending}>
                          {pending ? <Spinner size="sm" /> : "Submit"}
                        </Button>
                      </div>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
