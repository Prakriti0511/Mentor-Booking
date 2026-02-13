import mongoose, { Schema, Model, Types } from "mongoose";

// TypeScript interface for Slot document
export interface ISlot extends mongoose.Document {
  mentorId: Types.ObjectId;
  date: Date;
  startTime: string;
  endTime: string;
  isBooked: boolean;
  createdAt: Date;
}

// Mongoose schema definition
const SlotSchema = new Schema<ISlot>(
  {
    mentorId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Mentor ID is required"],
    },
    date: {
      type: Date,
      required: [true, "Date is required"],
    },
    startTime: {
      type: String,
      required: [true, "Start time is required"],
    },
    endTime: {
      type: String,
      required: [true, "End time is required"],
    },
    isBooked: {
      type: Boolean,
      default: false,
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
// Without this check, Mongoose would throw an error: "Cannot overwrite model 'Slot' once compiled"
// This pattern reuses the existing model if it exists, preventing re-compilation errors
const Slot: Model<ISlot> =
  mongoose.models.Slot || mongoose.model<ISlot>("Slot", SlotSchema);

export default Slot;
