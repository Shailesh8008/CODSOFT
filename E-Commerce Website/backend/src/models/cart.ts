import { Schema, model } from "mongoose";

const cartSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "users" },
  CartItems: [],
});

export default model("carts", cartSchema);
