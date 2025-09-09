// "use client";

// import * as z from "zod";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import MultipleSelector, { Option } from "@/components/ui/multiselect";
// import { Textarea } from "@/components/ui/textarea";
// import { Button } from "@/components/ui/button";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { useEffect, useState, useTransition } from "react";
// import { getFoodItems } from "@/actions/foodItem";

// const formSchema = z.object({
//   name: z.string().min(1, "Name is required"),
//   description: z.string().optional(),
//   pricing: z.object({
//     b: z.number().min(1, {
//       message: "pricing must be greater than zero",
//     }),
//     l: z.number().min(1, {
//       message: "pricing must be greater than zero",
//     }),
//     d: z.number().min(1, {
//       message: "pricing must be greater than zero",
//     }),
//     bl: z.number().min(1, {
//       message: "pricing must be greater than zero",
//     }),
//     ld: z.number().min(1, {
//       message: "pricing must be greater than zero",
//     }),
//     bd: z.number().min(1, {
//       message: "pricing must be greater than zero",
//     }),
//     bld: z.number().min(1, {
//       message: "pricing must be greater than zero",
//     }),
//   }),
//   menu: z.object({
//     sunday: {
//       breakfast: z.array(z.string()).min(2, {
//         message: "minimum two food Item to select for menu",
//       }),
//       lunch: z.array(z.string()).min(2, {
//         message: "minimum two food Item to select for menu",
//       }),
//       dinner: z.array(z.string()).min(2, {
//         message: "minimum two food Item to select for menu",
//       }),
//     },
//     monday: {
//       breakfast: z.array(z.string()).min(2, {
//         message: "minimum two food Item to select for menu",
//       }),
//       lunch: z.array(z.string()).min(2, {
//         message: "minimum two food Item to select for menu",
//       }),
//       dinner: z.array(z.string()).min(2, {
//         message: "minimum two food Item to select for menu",
//       }),
//     },
//     tuesday: {
//       breakfast: z.array(z.string()).min(2, {
//         message: "minimum two food Item to select for menu",
//       }),
//       lunch: z.array(z.string()).min(2, {
//         message: "minimum two food Item to select for menu",
//       }),
//       dinner: z.array(z.string()).min(2, {
//         message: "minimum two food Item to select for menu",
//       }),
//     },
//     wednesday: {
//       breakfast: z.array(z.string()).min(2, {
//         message: "minimum two food Item to select for menu",
//       }),
//       lunch: z.array(z.string()).min(2, {
//         message: "minimum two food Item to select for menu",
//       }),
//       dinner: z.array(z.string()).min(2, {
//         message: "minimum two food Item to select for menu",
//       }),
//     },
//     thursday: {
//       breakfast: z.array(z.string()).min(2, {
//         message: "minimum two food Item to select for menu",
//       }),
//       lunch: z.array(z.string()).min(2, {
//         message: "minimum two food Item to select for menu",
//       }),
//       dinner: z.array(z.string()).min(2, {
//         message: "minimum two food Item to select for menu",
//       }),
//     },
//     friday: {
//       breakfast: z.array(z.string()).min(2, {
//         message: "minimum two food Item to select for menu",
//       }),
//       lunch: z.array(z.string()).min(2, {
//         message: "minimum two food Item to select for menu",
//       }),
//       dinner: z.array(z.string()).min(2, {
//         message: "minimum two food Item to select for menu",
//       }),
//     },
//     saturday: {
//       breakfast: z.array(z.string()).min(2, {
//         message: "minimum two food Item to select for menu",
//       }),
//       lunch: z.array(z.string()).min(2, {
//         message: "minimum two food Item to select for menu",
//       }),
//       dinner: z.array(z.string()).min(2, {
//         message: "minimum two food Item to select for menu",
//       }),
//     },
//   }),
// });
// const mealMap = {
//   b: "Breakfast",
//   l: "Lunch",
//   d: "Dinner",
// };
// export default function RestaurantForm() {
//   const [foodItems, setFoodItems] = useState<Option[]>([]);
//   const [pending, startTransition] = useTransition();
//   // ✅ Fetch food items (replace `/api/foods` with your real endpoint)
//   useEffect(() => {
//     startTransition(async () => {
//       try {
//         const response = await getFoodItems();

//         if (response.success && response.foodItems) {
//           setFoodItems(
//             response.foodItems.map((v) => ({
//               value: v,
//               label: v,
//             }))
//           );
//         } else console.log(response.error);
//       } catch (error) {
//         console.error("Error fetching user data:", error);
//       }
//     });
//   }, []);
//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       name: "",
//       description: "",
//       pricing: {
//         b: 0,
//         l: 0,
//         d: 0,
//         bl: 0,
//         ld: 0,
//         bd: 0,
//         bld: 0,
//       },
//     },
//   });

//   function onSubmit(values: z.infer<typeof formSchema>) {
//     console.log(values);
//   }

//   return (
//     <div className="py-10 px-12 space-y-10">
//       <h1 className="text-3xl font-semibold">Tier Creation</h1>
//       <Form {...form}>
//         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
//           {/* Basic Info */}
//           <div className="space-y-4">
//             <FormField
//               control={form.control}
//               name="name"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Tier Name</FormLabel>
//                   <FormControl>
//                     <Input placeholder="Enter name" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <FormField
//               control={form.control}
//               name="description"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Description</FormLabel>
//                   <FormControl>
//                     <Textarea placeholder="Short description..." {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//           </div>

//           {/* Pricing */}
//           <div>
//             <h3 className="text-lg font-semibold mb-2">Pricing</h3>
//             <div className="grid grid-cols-2 gap-4">
//               {Object.keys(form.getValues("pricing")).map((key) => (
//                 <FormField
//                   key={key}
//                   control={form.control}
//                   name={`pricing.${key}` as any}
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>
//                         {key
//                           .split("")
//                           .map(
//                             (letter) => mealMap[letter as keyof typeof mealMap]
//                           )
//                           .filter(Boolean)
//                           .join(" + ")}
//                       </FormLabel>
//                       <FormControl>
//                         <Input
//                           type="number"
//                           placeholder="0"
//                           {...field}
//                           onChange={(e) =>
//                             field.onChange(Number(e.target.value))
//                           }
//                         />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//               ))}
//             </div>
//           </div>

//           {/* Menu (Tabs for Days) */}
//           <div>
//             <h3 className="text-lg font-semibold mb-2">Menu</h3>
//             <Tabs defaultValue="sunday">
//               <TabsList className="flex flex-wrap text-xl">
//                 {[
//                   "sunday",
//                   "monday",
//                   "tuesday",
//                   "wednesday",
//                   "thursday",
//                   "friday",
//                   "saturday",
//                 ].map((day) => (
//                   <TabsTrigger key={day} value={day}>
//                     {day}
//                   </TabsTrigger>
//                 ))}
//               </TabsList>
//               {[
//                 "sunday",
//                 "monday",
//                 "tuesday",
//                 "wednesday",
//                 "thursday",
//                 "friday",
//                 "saturday",
//               ].map((day) => (
//                 <TabsContent
//                   key={day}
//                   value={day}
//                   className="flex w-full gap-4 justify-around mt-5"
//                 >
//                   <FormField
//                     control={form.control}
//                     name={`menu.${day}.breakfast` as any}
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>{day} breakfast menu items</FormLabel>
//                         <FormControl>
//                           {foodItems.length > 0 && (
//                             <MultipleSelector
//                               commandProps={{
//                                 label: "Select Food Items",
//                               }}
//                               value={field.value.map((v: any) => ({
//                                 value: v,
//                                 label:
//                                   foodItems.find((f) => f.value === v)?.label ||
//                                   v,
//                               }))}
//                               onChange={(options) =>
//                                 field.onChange(options.map((o) => o.value))
//                               }
//                               defaultOptions={foodItems}
//                               placeholder="Select Food Items"
//                               hideClearAllButton
//                               hidePlaceholderWhenSelected
//                               emptyIndicator={
//                                 <p className="text-center text-sm">
//                                   {pending ? "loading.." : "No results found"}
//                                 </p>
//                               }
//                             />
//                           )}
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                   <FormField
//                     control={form.control}
//                     name={`menu.${day}.lunch` as any}
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>{day} lunch menu items</FormLabel>
//                         <FormControl>
//                           {foodItems.length > 0 && (
//                             <MultipleSelector
//                               commandProps={{
//                                 label: "Select Food Items",
//                               }}
//                               value={field.value.map((v: any) => ({
//                                 value: v,
//                                 label:
//                                   foodItems.find((f) => f.value === v)?.label ||
//                                   v,
//                               }))}
//                               onChange={(options) =>
//                                 field.onChange(options.map((o) => o.value))
//                               }
//                               defaultOptions={foodItems}
//                               placeholder="Select Food Items"
//                               hideClearAllButton
//                               hidePlaceholderWhenSelected
//                               emptyIndicator={
//                                 <p className="text-center text-sm">
//                                   {pending ? "loading.." : "No results found"}
//                                 </p>
//                               }
//                             />
//                           )}
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                   <FormField
//                     control={form.control}
//                     name={`menu.${day}.dinner` as any}
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>{day} dinner menu items</FormLabel>
//                         <FormControl>
//                           {foodItems.length > 0 && (
//                             <MultipleSelector
//                               commandProps={{
//                                 label: "Select Food Items",
//                               }}
//                               value={field.value.map((v: any) => ({
//                                 value: v,
//                                 label:
//                                   foodItems.find((f) => f.value === v)?.label ||
//                                   v,
//                               }))}
//                               onChange={(options) =>
//                                 field.onChange(options.map((o) => o.value))
//                               }
//                               defaultOptions={foodItems}
//                               placeholder="Select Food Items"
//                               hideClearAllButton
//                               hidePlaceholderWhenSelected
//                               emptyIndicator={
//                                 <p className="text-center text-sm">
//                                   {pending ? "loading.." : "No results found"}
//                                 </p>
//                               }
//                             />
//                           )}
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                 </TabsContent>
//               ))}
//             </Tabs>
//           </div>

//           <Button type="submit">Save</Button>
//         </form>
//       </Form>
//     </div>
//   );
// }
"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import MultipleSelector, { Option } from "@/components/ui/multiselect";
import { Tag, TagInput } from "emblor"
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState, useTransition } from "react";
import { getFoodItems } from "@/actions/foodItem";
import { createTier } from "@/actions/tier";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Spinner from "@/components/Spinner";
import { Label } from "@/components/ui/label";

// 🔹 Define schema for one day's menu
const daySchema = z.object({
  breakfast: z.array(z.string()).min(2, {
    message: "Minimum two food items required",
  }),
  lunch: z.array(z.string()).min(2, {
    message: "Minimum two food items required",
  }),
  dinner: z.array(z.string()).min(2, {
    message: "Minimum two food items required",
  }),
});

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z
    .string()
    .min(10, { message: "description must be 10 characters" }),
  pricing: z.object({
    b: z.number().min(1, { message: "Must be greater than zero" }),
    l: z.number().min(1, { message: "Must be greater than zero" }),
    d: z.number().min(1, { message: "Must be greater than zero" }),
    bl: z.number().min(1, { message: "Must be greater than zero" }),
    ld: z.number().min(1, { message: "Must be greater than zero" }),
    bd: z.number().min(1, { message: "Must be greater than zero" }),
    bld: z.number().min(1, { message: "Must be greater than zero" }),
  }),
  menu: z.object({
    sunday: daySchema,
    monday: daySchema,
    tuesday: daySchema,
    wednesday: daySchema,
    thursday: daySchema,
    friday: daySchema,
    saturday: daySchema,
  }),
});

const mealMap = {
  b: "Breakfast",
  l: "Lunch",
  d: "Dinner",
};

export default function RestaurantForm() {
  const [foodItems, setFoodItems] = useState<Option[]>([]);
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const [packingTags, setPackingTags] = useState<Tag[]>([])
  const [activeTagIndex, setActiveTagIndex] = useState<number | null>(null)
  const router = useRouter();
  // ✅ Fetch food items
  useEffect(() => {
    startTransition(async () => {
      try {
        const response = await getFoodItems();
        if (response.success && response.foodItems) {
          setFoodItems(
            response.foodItems.map((v: string) => ({
              value: v,
              label: v,
            }))
          );
        } else console.log(response.error);
      } catch (error) {
        console.error("Error fetching food items:", error);
      }
    });
  }, []);

  // ✅ Create empty menu defaults
  const emptyDay = { breakfast: [], lunch: [], dinner: [] };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      pricing: {
        b: 0,
        l: 0,
        d: 0,
        bl: 0,
        ld: 0,
        bd: 0,
        bld: 0,
      },
      menu: {
        sunday: emptyDay,
        monday: emptyDay,
        tuesday: emptyDay,
        wednesday: emptyDay,
        thursday: emptyDay,
        friday: emptyDay,
        saturday: emptyDay,
      },
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    if(packingTags.length < 1){
      toast.error("must want packing options")
      return
    }
    startTransition(async () => {
      try {
        const response = await createTier({
          name: values.name,
          description: values.description,
          pricing: values.pricing,
          menu: values.menu,
          packing: packingTags.map(tag=> tag.text)
        });

        if (response.success) {
          setError("");
          toast.success("Subscribed successfully");
          router.push("/dashboard");
        } else {
          setError(response.error || "An error.");
        }
      } catch (error) {
        console.error(error);
      }
    });
  }

  return (
    <div className="py-10 px-12 space-y-10">
      <h1 className="text-3xl font-semibold  tracking-tight">Tier Creation<span className="text-brand-color">.</span></h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Basic Info */}
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tier Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Short description..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Pricing */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Pricing</h3>
            <div className="grid grid-cols-2 gap-4">
              {Object.keys(form.getValues("pricing")).map((key) => (
                <FormField
                  key={key}
                  control={form.control}
                  name={`pricing.${key}` as any}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {key
                          .split("")
                          .map(
                            (letter) => mealMap[letter as keyof typeof mealMap]
                          )
                          .filter(Boolean)
                          .join(" + ")}
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="0"
                          {...field}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
            </div>
          </div>

          {/* Menu */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Menu</h3>
            <Tabs defaultValue="sunday">
              <TabsList className="flex flex-wrap text-xl">
                {Object.keys(form.getValues("menu")).map((day) => (
                  <TabsTrigger key={day} value={day}>
                    {day}
                  </TabsTrigger>
                ))}
              </TabsList>

              {Object.keys(form.getValues("menu")).map((day) => (
                <TabsContent
                  key={day}
                  value={day}
                  className="flex w-full gap-4 justify-around mt-5"
                >
                  {["breakfast", "lunch", "dinner"].map((meal) => (
                    <FormField
                      key={`${day}.${meal}`}
                      control={form.control}
                      name={`menu.${day}.${meal}` as any}
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel>
                            {day.charAt(0).toUpperCase() + day.slice(1)} {meal} menu items
                          </FormLabel>
                          <FormControl>
                            {foodItems.length > 0 && (
                              <MultipleSelector
                                commandProps={{
                                  label: "Select Food Items",
                                }}
                                value={field.value?.map((v: string) => ({
                                  value: v,
                                  label:
                                    foodItems.find((f) => f.value === v)
                                      ?.label || v,
                                }))}
                                onChange={(options) =>
                                  field.onChange(options.map((o) => o.value))
                                }
                                defaultOptions={foodItems}
                                placeholder="Select Food Items"
                                hideClearAllButton
                                hidePlaceholderWhenSelected
                                emptyIndicator={
                                  <p className="text-center text-sm">
                                    {pending
                                      ? "Loading..."
                                      : "No results found"}
                                  </p>
                                }
                              />
                            )}
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  ))}
                </TabsContent>
              ))}
            </Tabs>
          </div>
          <div className="*:not-first:mt-2">
            <Label >Packing Options</Label>
            <TagInput
              tags={packingTags}
              setTags={(newTags) => {
                setPackingTags(newTags);
              }}
              placeholder="Add a package"
              styleClasses={{
                tagList: {
                  container: "gap-1",
                },
                input:
                  "rounded-md transition-[color,box-shadow] placeholder:text-muted-foreground/70 focus-visible:border-ring outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50",
                tag: {
                  body: "relative h-7 bg-background border border-input hover:bg-background rounded-md font-medium text-xs ps-2 pe-7",
                  closeButton:
                    "absolute -inset-y-px -end-px p-0 rounded-s-none rounded-e-md flex size-7 transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] text-muted-foreground/80 hover:text-foreground",
                },
              }}
              activeTagIndex={activeTagIndex}
              setActiveTagIndex={setActiveTagIndex}
              inlineTags={false}
              inputFieldPosition="top"
            />

          </div>
          <FormMessage>{error}</FormMessage>

          <Button type="submit" className="w-full bg-brand-color hover:bg-brand-color/90" disabled={pending}>
            {pending ? <Spinner size="sm" /> : "Create A Tier"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
