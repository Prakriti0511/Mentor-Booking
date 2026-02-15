import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Slot from "@/models/Slot";
import { verifyToken } from "@/lib/auth";

export async function GET() {
  try {
    await connectDB();
    const slots = await Slot.find({ isBooked: false }).lean();

    return NextResponse.json(
      { success: true, data: slots },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const user = verifyToken(request);

    if (!user || user.role !== "mentor") {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { date, startTime, endTime } = body;

    if (!date || !startTime || !endTime) {
      return NextResponse.json(
        { error: "date, startTime and endTime are required" },
        { status: 400 }
      );
    }

    const slot = await Slot.create({
      mentorId: user.userId,
      date: new Date(date),
      startTime,
      endTime,
    });

    return NextResponse.json(
      { success: true, data: slot },
      { status: 201 }
    );

  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
