import mongoose, { Document, Schema } from "mongoose";

export interface IFoodItem extends Document {
  foodItem: string;
  foodCategory: string;
  price:number;
}

const foodItemSchema = new Schema<IFoodItem>({
  foodItem: { type: String, required: true },
  foodCategory: { type: String, required: true },
  price: { type: Number, required: true },
});
// Check if the model already exists to avoid redefining it
const FoodItem = mongoose.models.FoodItem || mongoose.model<IFoodItem>("FoodItem", foodItemSchema);

export default FoodItem;
