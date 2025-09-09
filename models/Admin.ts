import mongoose, { Document, Schema } from "mongoose";

export interface IAdmin extends Document {
  name: string;
  email: string;
  password: string;
  role: "super" | "chef" | "pack" | "delivery";
}

const adminSchema = new Schema<IAdmin>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["super", "chef", "pack", "delivery"],
    required: true,
  },
});
// Check if the model already exists to avoid redefining it
const Admin = mongoose.models.Admin || mongoose.model<IAdmin>("Admin", adminSchema);

export default Admin;
