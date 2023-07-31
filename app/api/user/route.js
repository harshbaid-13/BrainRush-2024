import User from "@models/user";
import { connectToDatabase } from "@utils/db";
const { NextResponse } = require("next/server");

export async function PUT(request) {
  try {
    await connectToDatabase();
    const { userId, name, department, year } = await request.json();

    const user = await User.findByIdAndUpdate(
      userId,
      { name, department, year },
      { new: true }
    );

    return NextResponse.json({
      status: 200,
      success: true,
      message: "User data updated successfully",
      data: user,
    });
  } catch (error) {
    console.error("Error updating user data:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
