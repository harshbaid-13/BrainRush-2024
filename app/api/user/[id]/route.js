import User from "@models/user";
import { connectToDatabase } from "@utils/db";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

// Get User Details
export async function GET(request, { params }) {
  try {
    await connectToDatabase();
    if (!mongoose.Types.ObjectId.isValid(params.id)) {
      return NextResponse.json({ message: "Not a valid ID" }, { status: 404 });
    }
    let user = await User.findById(params.id);

    if (!user) {
      return NextResponse.json({ success: false, message: "User not found" });
    }
    return NextResponse.json({ success: true, data: user });
  } catch (error) {
    console.error("Error fetching user data:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// Update User Details
export async function PUT(request) {
  try {
    await connectToDatabase();
    const { userId, name, department, year, contact } = await request.json();
    const user = await User.findByIdAndUpdate(
      userId,
      { name, department, year, phoneNumber: contact },
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
