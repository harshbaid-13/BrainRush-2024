import ConfirmationRequest from "@models/confirmationRequest";
import Team from "@models/team";
import User from "@models/user";
import { connectToDatabase } from "@utils/db";
import sendConfirmationEmail from "@utils/sendConfirmationEmail";

const { NextResponse } = require("next/server");

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

export async function PUT(request) {
  try {
    await connectToDatabase();
    const { teamId, userId } = await request.json();
    const confirmationRequest = await ConfirmationRequest.findOne({
      teamId,
    });

    const team = await Team.findByIdAndUpdate(
      teamId,
      { teamMember: userId, teamMemberConfirmation: true },
      { new: true }
    );

    await confirmationRequest.deleteOne();

    return NextResponse.json({
      success: true,
      status: 200,
      message: "Team Member Added Successfully",
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

export async function DELETE(request) {
  try {
    await connectToDatabase();
    const { teamId, userId } = await request.json();
    const confirmationRequest = await ConfirmationRequest.findOne({
      teamId,
    });

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
