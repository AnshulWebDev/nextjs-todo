import { NextResponse } from "next/server";
import { connectDB } from "../../../../../utils/features";
import { User } from "../../../../../models/user";
import bcrypt from "bcrypt";
export const POST = async (req) => {
  try {
    await connectDB();
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { success: false, message: "Enter all fields" },
        { status: 402 }
      );
    }

    const finduser = await User.findOne({ email });
    if (finduser) {
      return NextResponse.json(
        { success: false, message: "Email is already registered" },
        { status: 401 }
      );
    }

    const hashPassword = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      password: hashPassword,
    });

    const response = NextResponse.json(
      { success: true, message: "Account Created" },
      { status: 200 }
    );

    return response;
  } catch (error) {
    console.log(error.message);
    return NextResponse.json(
      { success: false, message: "Internal server error Try Again" },
      { status: 500 }
    );
  }
};
