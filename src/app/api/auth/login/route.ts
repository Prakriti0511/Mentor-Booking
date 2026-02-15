import { NextRequest, NextResponse } from "next/server";
import {connectDB} from "@/lib/db";
import {loginSchema} from "@/utils/validators";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    await connectDB();
    
    const parsed = loginSchema.safeParse(body);

    if(!parsed.success) {
        return NextResponse.json(
            {error : "Invalid input" },
            {status: 400}
        );
    }
    const {email, password} = parsed.data;

    const user = await User.findOne({email});

    if(!user) {
        return NextResponse.json(
            {error : "Invalid credentials"},
            {status: 401}
        );
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch) {
        return NextResponse.json(
            {error: "Invalid credentials"},
            {status: 401}
        );
    }
    const token = jwt.sign(
        {
            userId: user._id,
            role: user?.role,
        },
        process.env.JWT_SECRET!,
        {expiresIn: "1d"}
    );
    return NextResponse.json(
        {
            success:true,
            token,
        },
        {status: 200}
    );
    return NextResponse.json(
      {
        success: true,
        message: "Login successful",
        data: {},
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "Login failed",
        error: "Internal server error",
      },
      { status: 500 }
    );
  }
}
