import { NextResponse } from "next/server";
import Team from "@models/team";
import { connectToDatabase } from "@utils/db";

export async function GET(request, { params }) {
  try {
    await connectToDatabase();
    let team = await Team.findOne({ leader: params.id }).populate("leader");
    return NextResponse.json({ success: true, data: team });
  } catch (error) {
    console.error("Error fetching team:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
