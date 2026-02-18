import { Schema, model } from "mongoose";

const cartSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "users" },
  CartItems: [],
});

module.exports = model("carts", cartSchema);
