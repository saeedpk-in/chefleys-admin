"use server";
// app/actions/userActions.ts
import { connectToDatabase } from "@/lib/mongodb";
import Plan from "@/models/Plan";
import Tier, { DayOfWeek, ITier } from "@/models/Tier";

export async function getFoodCountByDate(
  date: Date,
  meal: "breakfast" | "lunch" | "dinner"
) {
  await connectToDatabase();

  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);

  const plans = await Plan.find({
    [`${meal}.date`]: { $gte: startOfDay, $lte: endOfDay },
    [`${meal}.status`]: "active",
  }).lean();

  if (!plans.length) {
    return { success: false, error: "Plans not found" };
  }

  // Step 2: group by tier and count
  const foodCount: Record<string, number> = {};

  for (const plan of plans) {
    // 👇 properly typed result
    const tier = await Tier.findOne({ name: plan.tier }).lean<ITier>();
    if (!tier) continue;

    const dayName = date
      .toLocaleDateString("en-US", { weekday: "long" })
      .toLowerCase() as DayOfWeek;

    const menuItems: string[] = tier.menu[dayName][meal];

    for (const item of menuItems) {
      foodCount[item] = (foodCount[item] || 0) + 1;
    }
  }
  return {
    success: true,
    foodCount,
  };
}
export async function getPackCountByDate(date: Date) {
  await connectToDatabase();

  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);

  // Fetch all plans where at least one meal entry matches
  const plans = await Plan.find({
    $or: [
      {
        breakfast: {
          $elemMatch: {
            date: { $gte: startOfDay, $lte: endOfDay },
            status: "active",
          },
        },
      },
      {
        lunch: {
          $elemMatch: {
            date: { $gte: startOfDay, $lte: endOfDay },
            status: "active",
          },
        },
      },
      {
        dinner: {
          $elemMatch: {
            date: { $gte: startOfDay, $lte: endOfDay },
            status: "active",
          },
        },
      },
    ],
  }).lean();

  if (!plans.length) {
    console.log("sddjio");
    
    return { success: true, data: { breakfast: [], lunch: [], dinner: [] } };
  }

  const result = {
    breakfast: [] as { tierName: string; packData: { packing: string; count: number }[] }[],
    lunch: [] as { tierName: string; packData: { packing: string; count: number }[] }[],
    dinner: [] as { tierName: string; packData: { packing: string; count: number }[] }[],
  };

  for (const plan of plans) {
    const tier = await Tier.findOne({ name: plan.tier }).lean<ITier>();
    if (!tier) continue;

    for (const meal of ["breakfast", "lunch", "dinner"] as const) {
      const entries = (plan[meal] as any[]).filter(
        (m) =>
          new Date(m.date) >= startOfDay &&
          new Date(m.date) <= endOfDay &&
          m.status === "active"
      );

      if (!entries.length) continue;

      const packCountMap: Record<string, number> = {};
      for (const e of entries) {
        packCountMap[e.packing] = (packCountMap[e.packing] || 0) + 1;
      }

      result[meal].push({
        tierName: tier.name,
        packData: Object.entries(packCountMap).map(([packing, count]) => ({
          packing,
          count,
        })),
      });
    }
  }
  console.log(result);
  
  return { success: true, data: result };
}

