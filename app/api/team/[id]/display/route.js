import { NextResponse } from "next/server";
import Team from "@models/team";
import User from "@models/user";
import { connectToDatabase } from "@utils/db";
import mongoose from "mongoose";

// Get Logged In User Team
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
    }).populate(["leader", "teamMember"]);
    if (!team) {
      return NextResponse.json({ success: false, message: "Team not found" });
    }
    return NextResponse.json({ success: true, data: team });
  } catch (error) {
    console.error("Error fetching team:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// Exit Team Team Member
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
    const team = await Team.findOne({ teamMember: id });

    // Check if payment is done
    if (team.payment) {
      return NextResponse.json(
        { message: "You cannot exit the team after completing the payment" },
        { status: 403 }
      );
    }
    const user = await Team.findByIdAndUpdate(
      team._id,
      { teamMember: null, teamMemberConfirmation: false },
      { new: true }
    );

    return NextResponse.json({
      success: true,
      message: "Team member removed successfully",
    });
  } catch (error) {
    console.error("Error removing team member:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
