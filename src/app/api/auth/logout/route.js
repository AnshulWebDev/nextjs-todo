import { NextResponse } from "next/server";

export const GET = async (req) => {
  try {
    const response = NextResponse.json(
      { success: true, message: `Logout Successfull` },
      { status: 200 }
    );

    response.cookies.delete("token")

    return response;
  } catch (error) {
    console.log(error.message);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
};
