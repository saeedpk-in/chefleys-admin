import mongoose, { Document, Schema } from "mongoose";
export type MealType = "breakfast" | "lunch" | "dinner";
export type DayOfWeek =
  | "sunday"
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday";
export interface ITier extends Document {
  name: string;
  description: string;
  pricing: {
    b: number;
    l: number;
    d: number;
    bl: number;
    ld: number;
    bd: number;
    bld: number;
  };
  packing:string[],
  menu: Record<DayOfWeek, Record<MealType, string[]>>;
}

const tierSchema = new Schema<ITier>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  packing: [{ type: String, required: true }],
  pricing: {
    b: { type: Number, required: true },
    l: { type: Number, required: true },
    d: { type: Number, required: true },
    bl: { type: Number, required: true },
    ld: { type: Number, required: true },
    bd: { type: Number, required: true },
    bld: { type: Number, required: true },
  },
  menu: {
    sunday: {
      breakfast: [{ type: String, required: true }],
      lunch: [{ type: String, required: true }],
      dinner: [{ type: String, required: true }],
    },
    monday: {
      breakfast: [{ type: String, required: true }],
      lunch: [{ type: String, required: true }],
      dinner: [{ type: String, required: true }],
    },
    tuesday: {
      breakfast: [{ type: String, required: true }],
      lunch: [{ type: String, required: true }],
      dinner: [{ type: String, required: true }],
    },
    wednesday: {
      breakfast: [{ type: String, required: true }],
      lunch: [{ type: String, required: true }],
      dinner: [{ type: String, required: true }],
    },
    thursday: {
      breakfast: [{ type: String, required: true }],
      lunch: [{ type: String, required: true }],
      dinner: [{ type: String, required: true }],
    },
    friday: {
      breakfast: [{ type: String, required: true }],
      lunch: [{ type: String, required: true }],
      dinner: [{ type: String, required: true }],
    },
    saturday: {
      breakfast: [{ type: String, required: true }],
      lunch: [{ type: String, required: true }],
      dinner: [{ type: String, required: true }],
    },
  },
});
delete mongoose.models.Tier
const Tier = mongoose.models.Tier || mongoose.model<ITier>("Tier", tierSchema);

export default Tier;
