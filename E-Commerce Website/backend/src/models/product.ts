import { Schema, model } from "mongoose";

const productSchema = new Schema({
  pname: { type: String, require: true },
  price: { type: Number, require: true },
  category: { type: String, require: true },
  status: { type: String, require: true },
  pimage: { type: String },
});

module.exports = model("products", productSchema);
