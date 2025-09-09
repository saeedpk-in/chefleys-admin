"use server";

import { connectToDatabase } from "@/lib/mongodb";
import FoodCategory from "@/models/FoodCategory";
import bcrypt from "bcryptjs";
export async function createFoodCategory(category: string) {
  try {
    // Connect to the database
    await connectToDatabase();
    const existingFoodCategory = await FoodCategory.findOne({ category });
    if (existingFoodCategory) {
      return {
        success: false,
        error: "This category added earlier",
      };
    }

    const newFoodCategory = new FoodCategory({
      category,
    });

    // Save the new FoodCategory
    await newFoodCategory.save();

    return { success: true, message: "Category added Succussfully." };
  } catch (error) {
    console.log(error);

    return { success: false, error: (error as Error).message };
  }
}
export async function getFoodCategories(): Promise<{ success: boolean; categories?: string[]; error?: string }> {
  try {
    await connectToDatabase();

    const categories = await FoodCategory.find().lean();

    if (!categories || categories.length === 0) {
      return { success: false, error: "No food categories found" };
    }

    // Just extract the category string
    const categoryList = categories.map(cat => cat.category);

    return { success: true, categories: categoryList };
  } catch (error) {
    console.error("Error fetching food categories:", error);
    return { success: false, error: "Server error while fetching food categories" };
  }
}
