import User from "@models/user";
import { connectToDatabase } from "@utils/db";
const { NextResponse } = require("next/server");

export async function PUT(request) {
  try {
    await connectToDatabase();
    const { email, name, department, year } = await request.json();

    const userToUpdate = await User.findOne({ email });

    if (!userToUpdate) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Update
    userToUpdate.name = name;
    userToUpdate.department = department;
    userToUpdate.year = year;
    await userToUpdate.save();

    return NextResponse.json({ message: "User data updated successfully" });
  } catch (error) {
    console.error("Error updating user data:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
