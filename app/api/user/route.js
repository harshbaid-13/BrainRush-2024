import { NextResponse } from "next/server";
import { connectToDatabase } from "@utils/db";
import User from "@models/user";

//particuler user ka details
export async function GET(req) {
  try {
    await connectToDatabase();
    const email = req.headers.get("authorization");
    console.log(email);
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
    const email = req.headers.get("authorization");
    const updatedUser = await User.updateOne(
      { email: email },
      { name, department, year, phoneNumber: contact },
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
