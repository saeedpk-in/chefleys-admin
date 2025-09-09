"use server";
// app/actions/userActions.ts
import { connectToDatabase } from "@/lib/mongodb";
import Admin from "@/models/Admin";
import bcrypt from "bcryptjs";
// import nodemailer from "nodemailer";
// import { uploadImage } from "./upoladImg";

// Action to create a new user and send verification email
export async function createAdmin({
  name,
  email,
  password,
  role,
}: {
  name: string;
  email: string;
  password: string;
  role: "super" | "chef" | "pack" | "delivery";
}) {
  try {
    // Connect to the database
    await connectToDatabase();
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return {
        success: false,
        error: "In this email there is an admin account. Please move to login",
      };
    }

    // Hash password
    const bPassword = await bcrypt.hash(password, 10);

    const newAdmin = new Admin({
      name,
      email,
      password: bPassword,
      role,
    });

    // Save the new Admin
    await newAdmin.save();

    return { success: true, message: "Verification email has been sent." };
  } catch (error) {
    console.log(error);

    return { success: false, error: (error as Error).message };
  }
}

export async function getAdminById(id: string) {
  await connectToDatabase();
  const admin = await Admin.findById(id);

  if (!admin) {
    return { success: false, error: "User not found" };
  }

  return {
    success: true,
    admin: JSON.parse(JSON.stringify(admin)),
  };
}

// Server-side logic (PUT request) inside the component using `use server`
export async function updateAdminById(
  id: string,
  data: {
    name: string;
    email: string;
    password: string;
    role: "super" | "chef" | "pack" | "delivery";
  }
) {
  await connectToDatabase();

  const updatedAdmin = await Admin.findOneAndUpdate({ _id: id }, data, {
    new: true,
  });

  if (!updatedAdmin) {
    return { error: "User not found" };
  }

  return { success: true, message: "User updated successfully!" };
}
