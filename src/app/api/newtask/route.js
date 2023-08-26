import { NextResponse } from "next/server";
import { connectDB } from "../../../../utils/features";
import { Task } from "../../../../models/task";
import { User } from "../../../../models/user";

export const POST = async (req) => {
  try {
    await connectDB();
    const { title, description } = await req.json();
    const cookiesValue = await req.cookies.get("token")?.value;
    if(!title||!description){
      return NextResponse.json(
        { success: false, message: "Please Fill all fields" },
        { status: 402 }
      );
    }
    if (!cookiesValue) {
      return NextResponse.json(
        { success: false, message: "Please login first" },
        { status: 402 }
      );
    }
    const userDetails = await User.findOne({ token: cookiesValue });
    if (!userDetails) {
      return NextResponse.json(
        { success: false, message: "unauthorize access or login first" },
        { status: 402 }
      );
    }

    const newTask = await Task.create({
      title,
      description,
      user: userDetails._id,
    });
    await newTask.save();
    return NextResponse.json(
      { success: true, message: "Task created" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error.message);
    return NextResponse.json({ success: false  }, { status: 500 });
  }
};
