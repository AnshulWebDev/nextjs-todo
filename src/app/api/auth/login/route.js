import { NextResponse } from "next/server";
import { connectDB } from "../../../../../utils/features";
import { User } from "../../../../../models/user";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const POST = async (req) => {
  try {
    await connectDB();
    const {email,password} = await req.json();
    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Enter all fields" },
        { status: 402 }
      );
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return NextResponse.json(
        { success: false, message: "Email is Not registered" },
        { status: 401 }
      );
    }
    console.log(user)
    if (await bcrypt.compare(password, user.password)) {
      const payload = {
        email: user.email,
        id: user._id,
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "2h",
      });
      user.token = token;
      const response = NextResponse.json(
        { success: true, message: "Account Loggedin" },
        { status: 200 }
      );
  
      response.cookies.set({
        name: "token",
        value: token,
        httpOnly: true,
        maxAge: 3 * 24 * 60 * 60 * 1000,
      });
  
      return response;
    }else{
        return NextResponse.json({success:false,message:"password incorrect"},{status:400})
    }

  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
};
