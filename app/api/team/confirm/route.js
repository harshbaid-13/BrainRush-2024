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
    const team = await Team.findOne({ leader: userId });
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

    sendConfirmationEmail(teamLeader, team, teamMemberEmail);

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
      teamId,
      { teamMember: userId, teamMemberConfirmation: true },
      { new: true }
    );

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
    const confirmationRequest = await ConfirmationRequest.findById(id);

    await confirmationRequest.deleteOne();

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
