import { NextResponse } from "next/server";
import { connectDB } from "../../../../utils/features";
import { Task } from "../../../../models/task";

export const POST = async (req) => {
  try {
    await connectDB();
    const { title, description, user } = await req.json();
    await Task.create({
      title,
      description,
      user,
    });
    return NextResponse.json(
      { success: true, message: "Task created" },
      {status: 200}
    );
  } catch (error) {
    console.log(error.message);
    return NextResponse.json({ success: false }, { status: 500 });
  }
};
