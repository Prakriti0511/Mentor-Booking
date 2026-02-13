import mongoose, { Schema, Model } from "mongoose";

// TypeScript interface for User document
export interface IUser extends mongoose.Document {
  name: string;
  email: string;
  password: string;
  role: "user" | "mentor";
  createdAt: Date;
}

// Mongoose schema definition
const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    role: {
      type: String,
      enum: ["user", "mentor"],
      default: "user",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: false, // We're handling createdAt manually
  }
);

// Safe export for Next.js hot reload
// Why mongoose.models check exists:
// In Next.js development mode, modules can be reloaded multiple times.
// Without this check, Mongoose would throw an error: "Cannot overwrite model 'User' once compiled"
// This pattern reuses the existing model if it exists, preventing re-compilation errors
const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;
