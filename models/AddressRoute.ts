import mongoose, { Document, Schema } from "mongoose";

export interface IAddressRoute extends Document {
  route: string;
}

const addressRouteSchema = new Schema<IAddressRoute>({
  route: { type: String, required: true },
});
// Check if the model already exists to avoid redefining it
const AddressRoute = mongoose.models.AddressRoute || mongoose.model<IAddressRoute>("AddressRoute", addressRouteSchema);

export default AddressRoute;