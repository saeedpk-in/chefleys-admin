import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  homeAddress: {
    address:string;
    route:string;
  };
  gender: "male" | "female" | "other";
  age: number;
  officeAddress?: {
    address:string;
    route:string;
  };
  phNumber: string;
  profileImage: {
    data: Buffer;
    contentType: string;
  };
  idProof: {
    data: Buffer;
    contentType: string;
  };
  emailVerified: boolean;
  emailVerificationToken?: string;
  emailVerificationExpires?: Date;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  homeAddress: {
    address:{ type: String, required: true },
    route:{ type: String, required: true }
  },
  officeAddress: { type: String, required: false },
  gender: { type: String, enum: ["male", "female", "other"], required: true },
  age: { type: Number, required: true },
  profileImage: {
    data: Buffer,
    contentType: String,
  },
  idProof: {
    data: Buffer,
    contentType: String,
  },
  phNumber: { type: String, required: false },
  emailVerified: { type: Boolean, default: false },
  emailVerificationToken: String,
  emailVerificationExpires: Date,
});
// Check if the model already exists to avoid redefining it
const User = mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export default User;
