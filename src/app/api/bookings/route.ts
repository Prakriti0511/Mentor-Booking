import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { verifyToken } from "@/lib/auth";
import Slot from "@/models/Slot";
import Booking from "@/models/Booking";

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const user = verifyToken(request);

    if (!user || user.role !== "user") {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { slotId } = body;

    if (!slotId) {
      return NextResponse.json(
        { error: "slotId is required" },
        { status: 400 }
      );
    }

    // 🔥 Atomic booking logic
    const slot = await Slot.findOneAndUpdate(
      { _id: slotId, isBooked: false },
      { isBooked: true },
      { new: true }
    );

    if (!slot) {
      return NextResponse.json(
        { error: "Slot already booked or not found" },
        { status: 400 }
      );
    }

    const booking = await Booking.create({
      userId: user.userId,
      mentorId: slot.mentorId,
      slotId: slot._id,
      status: "confirmed"
    });

    return NextResponse.json(
      { success: true, data: booking },
      { status: 201 }
    );

  } catch (error) {
    console.error("Error creating booking:", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
