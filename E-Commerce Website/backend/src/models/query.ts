import mongoose from "mongoose";
const { Schema, model } = mongoose;

const querySchema = new Schema({
  username: { type: String, require: true },
  email: { type: String, require: true },
  query: { type: String, require: true },
  status: { type: String, require: true, default: "Unread" },
});

export default model("queries", querySchema);
