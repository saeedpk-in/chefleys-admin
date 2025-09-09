import mongoose, { Document, Schema } from "mongoose";

export interface IFoodItem extends Document {
  foodItem: string;
  foodCategory: string;
}

const foodItemSchema = new Schema<IFoodItem>({
  foodItem: { type: String, required: true },
  foodCategory: { type: String, required: true },
});
// Check if the model already exists to avoid redefining it
const FoodItem = mongoose.models.FoodItem || mongoose.model<IFoodItem>("FoodItem", foodItemSchema);

export default FoodItem;
