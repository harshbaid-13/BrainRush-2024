import User from "@models/user";
import { connectToDatabase } from "@utils/db";
const { NextResponse } = require("next/server");

export async function GET(request, { params }) {
  try {
    await connectToDatabase();
    let user = await User.findOne({ _id: params.id });

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
