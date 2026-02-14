import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { registerSchema } from "@/utils/validators";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    const parsed = registerSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { name, email, password, role } = parsed.data;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role ?? "user",
    });

    return NextResponse.json(
      {
        success: true,
        message: "User registered successfully",
        data: { id: user._id.toString(), email: user.email },
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("Registration failed:", err);
    return NextResponse.json(
      {
        success: false,
        message: "Registration failed",
        error: "Internal server error",
      },
      { status: 500 }
    );
  }
}
