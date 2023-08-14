import ConfirmationRequest from "@models/confirmationRequest";
import Team from "@models/team";
import User from "@models/user";
import { connectToDatabase } from "@utils/db";
import sendConfirmationEmail from "@utils/sendConfirmationEmail";

const { NextResponse } = require("next/server");

// Send Invite Request
export async function POST(request) {
  try {
    await connectToDatabase();
    const { userId, teamMemberEmail } = await request.json();
    const requestSentAlready = await ConfirmationRequest.findOne({
      teamLeader: userId,
    });
    const teamLeader = await User.findById(userId);
    console.log(teamLeader);
    const team = await Team.findOne({ leader: userId });
    console.log(team);
    if (requestSentAlready) {
      return NextResponse.json({
        success: false,
        status: 400,
        message: "Delete Previous Request First to Send New Request",
      });
    }
    if (team.teamMemberConfirmation) {
      return NextResponse.json({
        success: false,
        status: 400,
        message: "Team Full",
      });
    }

    if (teamMemberEmail === teamLeader.email) {
      return NextResponse.json(
        { success: false, message: "You can't add yourself as a member" },
        { status: 400 }
      );
    }

    sendConfirmationEmail(teamLeader, team, teamMemberEmail, { event: 0 });

    const confirmationRequest = await ConfirmationRequest.create({
      team,
      teamLeader,
      teamMemberEmail,
    });

    return NextResponse.json({
      success: true,
      status: 200,
      message: "Email Sent Successfully",
      data: confirmationRequest,
    });
  } catch (error) {
    console.error("Error ", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// Accept Invite Request
export async function PUT(request) {
  try {
    await connectToDatabase();
    const { id, userId } = await request.json();
    const confirmationRequest = await ConfirmationRequest.findById(id);

    const userTeamExist = await Team.findOne({ leader: userId });

    if (userTeamExist) {
      return NextResponse.json({
        success: false,
        status: 400,
        message: "You have a team already",
      });
    }

    const team = await Team.findByIdAndUpdate(
      confirmationRequest?.team,
      { teamMember: userId, teamMemberConfirmation: true },
      { new: true }
    )
      .populate("leader")
      .populate("teamMember");

    await confirmationRequest.deleteOne();

    return NextResponse.json({
      success: true,
      status: 200,
      message: "Team Request Accepted Successfully",
      data: team,
    });
  } catch (error) {
    console.error("Error ", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// Reject Invite Request
export async function DELETE(request) {
  try {
    await connectToDatabase();
    const { id } = await request.json();
    const confirmationRequest = await ConfirmationRequest.findById(id)
      .populate("teamLeader")
      .populate("team");
    sendConfirmationEmail(
      confirmationRequest?.teamLeader,
      confirmationRequest.team,
      confirmationRequest.teamLeader.email,
      { event: 1 }
    );
    await confirmationRequest.deleteOne();
    //need to notify the leader that other member has rejected the request

    return NextResponse.json({
      success: true,
      status: 200,
      message: "Request Deleted Successfully",
    });
  } catch (error) {
    console.error("Error ", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
