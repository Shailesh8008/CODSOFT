import { Schema, model } from "mongoose";

const userSchema = new Schema({
  fname: { type: String, require: true },
  lname: { type: String },
  email: { type: String, require: true, unique: true },
  pass: { type: String, require: true },
  role: { type: String, enum: ["user", "admin"], default: "user" },
});

const userModel = model("users", userSchema);
export default userModel;
