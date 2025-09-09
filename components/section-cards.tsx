import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";
import Plan from "@/models/Plan";
import FoodItem from "@/models/FoodItem";

export async function SectionCards() {
  const { totalCustomers, activeUsers, totalMealsToday, totalFoodItems } =
    await getStats();

  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Meals Today</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {totalMealsToday}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingUp />
              +12.5%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Trending up this month <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Visitors for the last 6 months
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Customers</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {totalCustomers}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingDown />
              -20%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Down 20% this period <IconTrendingDown className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Acquisition needs attention
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Active Accounts</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {activeUsers}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingUp />
              +12.5%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Strong user retention <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">Engagement exceed targets</div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Food Items</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {totalFoodItems}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingUp />
              +4.5%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Steady performance increase <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">Meets growth projections</div>
        </CardFooter>
      </Card>
    </div>
  );
}

export async function getStats() {
  await connectToDatabase();

  const totalCustomersP = User.countDocuments();
  const totalFoodItemsP = FoodItem.countDocuments();

  // Use UTC-based day boundaries
  const now = new Date();
  const start = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
  const end = new Date(start);
  end.setUTCDate(start.getUTCDate() + 1);

  const mealAgg = await Plan.aggregate([
    {
      $project: {
        userId: 1,
        meals: { $concatArrays: ["$breakfast", "$lunch", "$dinner"] },
      },
    },
    { $unwind: "$meals" },
    {
      $match: {
        "meals.date": { $gte: start, $lt: end },
        "meals.status": "active",
      },
    },
    {
      $group: {
        _id: "$userId",
        mealsCount: { $sum: 1 },
      },
    },
    {
      $group: {
        _id: null,
        totalMeals: { $sum: "$mealsCount" },
        activeUsers: { $sum: 1 },
      },
    },
  ]);

  const aggResult = mealAgg[0] || { totalMeals: 0, activeUsers: 0 };

  const [totalCustomers, totalFoodItems] = await Promise.all([
    totalCustomersP,
    totalFoodItemsP,
  ]);

  return {
    totalCustomers,
    activeUsers: aggResult.activeUsers ?? 0,
    totalMealsToday: aggResult.totalMeals ?? 0,
    totalFoodItems,
  };
}
