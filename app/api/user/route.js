import { NextResponse } from "next/server";
import { connectToDatabase } from "@utils/db";
import User from "@models/user";

//particuler user ka details
export async function GET(req) {
  try {
    await connectToDatabase();
    const email = req.headers.get("Authorization");
    const user = await User.findOne({ email: email });
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
//profile update
export async function PUT(req) {
  try {
    await connectToDatabase();
    const { name, department, year, contact } = await req.json();
    const email = req.headers.get("Authorization");
    const user = await User.findOne({ email: email });
    if (!user) {
      return NextResponse.json({ success: false, message: "User not found" });
    }
    if (name.length > 50) {
      return NextResponse.json({
        success: false,
        message: "Name should be less than 50 characters",
      });
    }
    if (contact.length != 10) {
      return NextResponse.json({
        success: false,
        message: "Contact Number should be of 10 digits",
      });
    }
    if (department.length == "Select") {
      return NextResponse.json({
        success: false,
        message: "Select your department",
      });
    }
    if (year.length == "Select") {
      return NextResponse.json({
        success: false,
        message: "Select your batch",
      });
    }
    const updatedUser = await User.findByIdAndUpdate(
      user?._id,
      {
        name,
        department,
        year,
        phoneNumber: contact,
      },
      { new: true }
    );

    return NextResponse.json({
      status: 200,
      success: true,
      message: "User data updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.error("Error fetching updating data:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
