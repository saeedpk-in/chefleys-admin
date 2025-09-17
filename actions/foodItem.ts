"use server";

import { connectToDatabase } from "@/lib/mongodb";
import FoodItem from "@/models/FoodItem";
export async function createFoodItem({
  foodItem,
  foodCategory,
  price
}: {
  foodItem:string;
  foodCategory:string;
  price:number;
}) {
  try {
    // Connect to the database
    await connectToDatabase();
    const existingFoodItem = await FoodItem.findOne({ foodItem });
    if (existingFoodItem) {
      return {
        success: false,
        error: "This category added earlier",
      };
    }

    const newFoodItem = new FoodItem({
      foodItem,
      foodCategory,
      price
    });

    // Save the new FoodItem
    await newFoodItem.save();

    return { success: true, message: "Category added Succussfully." };
  } catch (error) {
    console.log(error);

    return { success: false, error: (error as Error).message };
  }
}
export async function getFoodItems(): Promise<{ success: boolean; foodItems?: string[]; error?: string }> {
  try {
    await connectToDatabase();

    const foodItem = await FoodItem.find().lean();

    if (!foodItem || foodItem.length === 0) {
      return { success: false, error: "No food foodItem found" };
    }

    // Just extract the category string
    const foodItemList = foodItem.map(item => item.foodItem);

    return { success: true, foodItems: foodItemList };
  } catch (error) {
    console.error("Error fetching food foodItem:", error);
    return { success: false, error: "Server error while fetching food foodItem" };
  }
}
