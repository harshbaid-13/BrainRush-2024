import { NextResponse } from "next/server";
import Team from "@models/team";
import { connectToDatabase } from "@utils/db";

//display one team
export async function GET(request, { params }) {
  try {
    await connectToDatabase();
    let team = await Team.findOne({ leader: params.id })
      .populate("leader")
      .populate("teamMember");
    if (!team) {
      team = await Team.findOne({ teamMember: params.id })
        .populate("leader")
        .populate("teamMember");
    }
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
//exit team--member
export async function DELETE(request, { params }) {
  try {
    await connectToDatabase();
    const teamMemberId = params.id;

    const team = await Team.findOne({ teamMember: teamMemberId });

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
