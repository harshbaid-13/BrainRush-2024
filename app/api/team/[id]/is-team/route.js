import { NextResponse } from "next/server";
import Team from "@models/team";
import User from "@models/user";
import { connectToDatabase } from "@utils/db";

//checks if team exists!
export async function GET(request, { params }) {
  try {
    await connectToDatabase();
    let team = await Team.findOne({
      $or: [{ leader: params.id }, { teamMember: params.id }],
    });
    return NextResponse.json({ success: true, data: team });
  } catch (error) {
    console.error("Error fetching team:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
