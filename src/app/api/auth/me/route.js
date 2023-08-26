import { NextResponse } from "next/server";
import { connectDB } from "../../../../../utils/features";
import { User } from "../../../../../models/user";
export const POST = async (req) => {
  try {
    await connectDB();
    const cookiesValue = await req.cookies.get("token")?.value;
    // console.log(cookiesValue);
    const user = await User.findOne({ token: cookiesValue });
    if (!user) {
      return NextResponse.json(
        { success: false, message: "Please login first" },
        { status: 402 }
      );
    }
    user.password = undefined;
    user.token = undefined;
    return NextResponse.json({ success: true, user }, { status: 200 });
  } catch (error) {
    console.log(error.message);
    return NextResponse.json(
      { success: false, message: "Internal server error Try Again" },
      { status: 500 }
    );
  }
};
