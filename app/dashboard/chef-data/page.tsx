"use client";
import React, { useEffect, useTransition } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
const page = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [currentTab, setCurrentTab] = useState("breakfast");
  const [foodCount, setFoodCount] = useState({});
  const [error, setError] = useState("");
  const [pending, startTransition] = useTransition();
  useEffect(() => {
    if (!date) return;
    setError("");
    setFoodCount({});
    startTransition(async () => {
      const result = await getFoodCountByDate(
        date,
        currentTab as "breakfast" | "lunch" | "dinner"
      );
      if (result.success && result.foodCount) {
        setFoodCount(result.foodCount);
      } else {
        setError(result.error || "An error");
      }
    });
  }, [currentTab, date]);

  return (
    <div className="py-10 px-12 space-y-10">
      <div className="flex justify-between">
        <h1 className="text-2xl">
          Chef Admin Data {date ? formatDate(date) : "Selected Date"}
        </h1>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className="group bg-background w-fit hover:bg-background border-input justify-between px-3 font-normal outline-offset-0 outline-none focus-visible:outline-[3px]"
            >
              <span
                className={cn("truncate", !date && "text-muted-foreground")}
              >
                {date ? format(date, "PPP") : "Pick a date"}
              </span>
              <CalendarIcon
                size={16}
                className="text-brand-color/80 group-hover:text-brand-color shrink-0 transition-colors"
                aria-hidden="true"
              />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-2" align="start">
            <Calendar mode="single" selected={date} onSelect={setDate} />
          </PopoverContent>
        </Popover>
      </div>
      <Tabs
        defaultValue="breakfast"
        value={currentTab}
        onValueChange={setCurrentTab}
        className="px-10"
      >
        <TabsList className="h-auto rounded-none border-b bg-transparent p-0 w-full">
          {["breakfast", "lunch", "dinner"].map((item) => (
            <TabsTrigger
              value={item}
              key={item}
              className="data-[state=active]:after:bg-brand-color data-[state=active]:text-brand-color relative rounded-none py-2 after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </TabsTrigger>
          ))}
        </TabsList>
        {["breakfast", "lunch", "dinner"].map((item) => (
          <TabsContent value={item} key={item}>
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead>Item</TableHead>
                  <TableHead className="text-right">Count</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Object.entries(foodCount).map(([foodItem, count], i) => (
                  <TableRow key={i} className="hover:bg-brand-color/10">
                    <TableCell className="font-medium">{foodItem}</TableCell>
                    <TableCell className="text-right">
                      {count as number}
                    </TableCell>
                  </TableRow>
                ))}

                {Object.keys(foodCount).length === 0 && !error && (
                  <TableRow>
                    <TableCell
                      colSpan={2}
                      className="text-center text-brand-color/70"
                    >
                      {pending ? (
                        <Spinner size="sm" />
                      ) : (
                        "No data for this date & meal"
                      )}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
            <p className="text-muted-foreground mt-4 text-center text-sm">
              {error}
            </p>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default page;
const formatDate = (date: Date) => {
  return date.toLocaleDateString("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

import { AppWindowIcon, CodeIcon } from "lucide-react";
import { getFoodCountByDate } from "@/actions/plan";
import Spinner from "@/components/Spinner";
