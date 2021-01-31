import { Schema, model } from "mongoose";

const UserSchema = new Schema({
  fullName: { type: String },
  email: { type: String, unique: true, lowercase: true },
  phone: { type: String },
  password: { type: String },
  date: { type: Date, default: Date.now() },
});

export default model("user", UserSchema);
