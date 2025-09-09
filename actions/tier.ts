"use server";
// app/actions/userActions.ts
import { connectToDatabase } from "@/lib/mongodb";
import Tier from "@/models/Tier";

// Action to create a new user and send verification email
export async function createTier({
  name,
  description,
  pricing: { b, l, d, bl, ld, bd, bld },
  menu: { sunday, monday, tuesday, wednesday, thursday, friday, saturday },
  packing,
}: {
  name: string;
  description?: string;
  pricing: {
    b: number;
    l: number;
    d: number;
    bl: number;
    ld: number;
    bd: number;
    bld: number;
  };
  menu: {
    sunday: {
      breakfast:string[]
      lunch:string[]
      dinner:string[]
    };
    monday: {
      breakfast:string[]
      lunch:string[]
      dinner:string[]
    };
    tuesday: {
      breakfast:string[]
      lunch:string[]
      dinner:string[]
    };
    wednesday: {
      breakfast:string[]
      lunch:string[]
      dinner:string[]
    };
    thursday: {
      breakfast:string[]
      lunch:string[]
      dinner:string[]
    };
    friday: {
      breakfast:string[]
      lunch:string[]
      dinner:string[]
    };
    saturday: {
      breakfast:string[]
      lunch:string[]
      dinner:string[]
    };
  };
  packing:string[]
}) {
  try {
    // Connect to the database
    await connectToDatabase();

    const newTier = new Tier({
      name,
      description,
      pricing: { b, l, d, bl, ld, bd, bld },
      menu: { sunday, monday, tuesday, wednesday, thursday, friday, saturday },
      packing
    });

    // Save the new user
    await newTier.save();

    return { success: true, message: "New Tier created Succussfully." };
  } catch (error) {
    console.log(error);

    return { success: false, error: (error as Error).message };
  }
}
// export async function getTierByUserId(userId: string) {
//   await connectToDatabase();
//   const tier = await Tier.findOne({ userId });

//   if (!tier) {
//     return { success: false, error: "User not found" };
//   }

//   return {
//     success: true,
//     tier: JSON.parse(JSON.stringify(tier)),
//   };
// }
