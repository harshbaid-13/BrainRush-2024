import Team from "@models/team";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { connectToDatabase } from "@utils/db";

export async function GET(request, { params }) {
  try {
    await connectToDatabase();
    const { id } = params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          message: "Invalid object ID",
        },
        { status: 404 }
      );
    }
    const team = await Team.findOne({
      $or: [{ leader: id }, { teamMember: params.id }],
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
