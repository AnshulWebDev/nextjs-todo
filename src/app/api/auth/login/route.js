import { NextResponse } from "next/server";
import { User } from "../../../../../models/user";
import { connectDB } from "../../../../../utils/features";

export const POST = async (req) => {
  try {
    await connectDB();
  } catch (error) {}
};
