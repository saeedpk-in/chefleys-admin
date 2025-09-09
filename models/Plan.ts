import mongoose, { Document, Schema } from "mongoose";

export interface IPlan extends Document {
  tier: string;
  userId: string;
  breakfast: [
    {
      date: Date;
      deliveryPoint: "home" | "office";
      packing: string;
    }
  ];
  lunch: [
    {
      date: Date;
      deliveryPoint: "home" | "office";
      packing: string;
    }
  ];
  dinner: [
    {
      date: Date;
      deliveryPoint: "home" | "office";
      packing: string;
    }
  ];
  
}

const planSchema = new Schema<IPlan>({
  userId: { type: String, required: true, unique: true },
  tier: { type: String, required: true },
  breakfast: [
    {
      date: { type: Date, required: true },
      deliveryPoint: { type: String, enum: ["home", "office"] },
      status: { type: String, enum: ["active", "pause"], default: "active" },
      packing: { type: String, required: true },
    },
  ],
  lunch: [
    {
      date: { type: Date, required: true },
      deliveryPoint: { type: String, enum: ["home", "office"] },
      status: { type: String, enum: ["active", "pause"], default: "active" },
      packing: { type: String, required: true },
    },
  ],
  dinner: [
    {
      date: { type: Date, required: true },
      deliveryPoint: { type: String, enum: ["home", "office"] },
      status: { type: String, enum: ["active", "pause"], default: "active" },
      packing: { type: String, required: true },
    },
  ],
});
// Check if the model already exists to avoid redefining it
delete mongoose.models.Plan
const Plan = mongoose.models.Plan || mongoose.model<IPlan>("Plan", planSchema);

export default Plan;
