import { NextResponse } from "next/server";
import { connectDB } from "../../../../../utils/features";
import { User } from "../../../../../models/user";


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

    const user = await User.create({
      name,
      email,
      password,
    });
    const options = {
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };

    return NextResponse.cookie("token", user._id, options).json(
      {
        success: true,
        message: "registered successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error.message);
    return NextResponse.json({ success: false }, { status: 500 });
  }
};
