import { NextResponse } from "next/server";
import { connectDB } from "../../../../../utils/features";
import { User } from "../../../../../models/user";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const POST = async (req) => {
  try {
    await connectDB();
    const { email, password } = await req.json();
    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Enter all fields" },
        { status: 402 }
      );
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return NextResponse.json(
        { success: false, message: "User Not Found" },
        { status: 401 }
      );
    }
    if (await bcrypt.compare(password, user.password)) {
      const payload = {
        email: user.email,
        id: user._id,
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "2h",
      });
      user.token = token;
      await user.save();
      user.password = undefined;
      user.token = undefined;
      const response = NextResponse.json(
        { success: true, message: `Welcome Back, ${user.name}`,user },
        { status: 200 },
        
      );

      response.cookies.set({
        name: "token",
        value: token,
        httpOnly: true,
        path: "/",
        maxAge: 120 * 1000,
      });

      return response;
    } else {
      return NextResponse.json(
        { success: false, message: "Email or Password incorrect" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
};
