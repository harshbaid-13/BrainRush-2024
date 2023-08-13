import Team from "@models/team";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { connectToDatabase } from "@utils/db";

// Check If Logged In User Team Exists
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
      $or: [{ leader: id }, { teamMember: id }],
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

// Delete Team by Leader
export async function DELETE(request, { params }) {
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
    const team = await Team.findOne({ leader: id });
    if (!team) {
      return NextResponse.json(
        { message: "You are not the Team Leader" },
        { status: 404 }
      );
    }
    await team.deleteOne();
    return NextResponse.json({
      success: true,
      message: "Team deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting team:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
