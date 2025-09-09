import mongoose, { Document, Schema } from "mongoose";

export interface IFoodCategory extends Document {
  category: string;
}

const foodCategorySchema = new Schema<IFoodCategory>({
  category: { type: String, required: true },
});
// Check if the model already exists to avoid redefining it
const FoodCategory = mongoose.models.FoodCategory || mongoose.model<IFoodCategory>("FoodCategory", foodCategorySchema);

export default FoodCategory;
