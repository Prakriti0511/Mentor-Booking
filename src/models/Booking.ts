import mongoose, { Schema, Model, Types } from "mongoose";

// TypeScript interface for Booking document
export interface IBooking extends mongoose.Document {
  userId: Types.ObjectId;
  mentorId: Types.ObjectId;
  slotId: Types.ObjectId;
  status: "confirmed" | "cancelled";
  createdAt: Date;
}

// Mongoose schema definition
const BookingSchema = new Schema<IBooking>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
    },
    mentorId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Mentor ID is required"],
    },
    slotId: {
      type: Schema.Types.ObjectId,
      ref: "Slot",
      required: [true, "Slot ID is required"],
    },
    status: {
      type: String,
      enum: ["confirmed", "cancelled"],
      default: "confirmed",
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
// Without this check, Mongoose would throw an error: "Cannot overwrite model 'Booking' once compiled"
// This pattern reuses the existing model if it exists, preventing re-compilation errors
const Booking: Model<IBooking> =
  mongoose.models.Booking || mongoose.model<IBooking>("Booking", BookingSchema);

export default Booking;
