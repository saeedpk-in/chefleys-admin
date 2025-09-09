"use server";
// app/actions/userActions.ts
import { connectToDatabase } from "@/lib/mongodb";
import Plan from "@/models/Plan";
import Tier from "@/models/Tier";
import User, { IUser } from "@/models/User";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
// import { uploadImage } from "./upoladImg";

// Action to create a new user and send verification email

export async function getUsersWithPlan() {
  await connectToDatabase();

  const usersWithPlans = await User.aggregate([
    {
      $addFields: {
        userIdStr: { $toString: "$_id" }, // convert ObjectId to string
      },
    },
    {
      $lookup: {
        from: "plans",
        localField: "userIdStr",
        foreignField: "userId",
        as: "plan",
      },
    },
    {
      $addFields: {
        planTier: { $arrayElemAt: ["$plan.tier", 0] },
      },
    },
    {
      $project: {
        name: 1,
        email: 1,
        age:1,
        gender:1,
        phNumber: 1,
        planTier: 1,
      },
    },
  ]);

  console.log(usersWithPlans);

  return {
    success: true,
    users: JSON.parse(JSON.stringify(usersWithPlans)),
  };
}

export async function getUserById(id: string) {
  await connectToDatabase();
  const user = await User.findById(id);

  if (!user) {
    return { success: false, error: "User not found" };
  }

  return {
    success: true,
    user: JSON.parse(JSON.stringify(user)),
  };
}

// Server-side logic (PUT request) inside the component using `use server`
export async function updateUserById(
  id: string,
  data: {
    name: string;
    email: string;
    homeAddress: string;
    gender: "male" | "female" | "other";
    age: number;
    officeAddress?: string;
    phNumber: string;
    profileImage?: File;
  }
) {
  await connectToDatabase();

  const updatedUser = await User.findOneAndUpdate({ _id: id }, data, {
    new: true,
  });

  if (!updatedUser) {
    return { error: "User not found" };
  }

  return { success: true, message: "User updated successfully!" };
}
