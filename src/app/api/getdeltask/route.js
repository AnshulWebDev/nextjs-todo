import { NextResponse } from "next/server";
import { connectDB } from "../../../../utils/features";
import { User } from "../../../../models/user";
import { Task } from "../../../../models/task";

export const POST = async (req) => {
  try {
    await connectDB();
    const cookiesValue = await req.cookies.get("token")?.value;
    if (!cookiesValue) {
      return NextResponse.json(
        { success: false, message: "Please login first" },
        { status: 402 }
      );
    }

    const { _id } = await User.findOne({ token: cookiesValue });
    if (!_id) {
      return NextResponse.json(
        { success: false, message: "unauthorize access or login first" },
        { status: 402 }
      );
    }
    console.log(_id);
    const getAllTask = await Task.find({ user: _id });
    console.log(getAllTask);
    if (!getAllTask) {
      return NextResponse.json(
        { success: false, message: "No task found" },
        { status: 301 }
      );
    }
    return NextResponse.json({ success: true, getAllTask }, { status: 200 });
  } catch (error) {
    console.log(error.message);
    return NextResponse.json(
      { success: false, message: "Internal server error Try Again" },
      { status: 500 }
    );
  }
};

export const DELETE = async (req) => {
  try {
    await connectDB();
    const { _id } = await req.body;
    const cookiesValue = await req.cookies.get("token")?.value;
    if (!cookiesValue) {
      return NextResponse.json(
        { success: false, message: "Please login first" },
        { status: 402 }
      );
    }

    const user = await User.findOne({ token: cookiesValue });
    if (!user) {
      return NextResponse.json(
        { success: false, message: "unauthorize access or login first" },
        { status: 402 }
      );
    }
    // console.log(_id);
    await Task.deleteOne(_id);

    return NextResponse.json(
      { success: true, message: "Task Delete Successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error.message);
    return NextResponse.json(
      { success: false, message: "Internal server error Try Again" },
      { status: 500 }
    );
  }
};
