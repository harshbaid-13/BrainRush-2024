import ConfirmationRequest from "@models/confirmationRequest";
import User from "@models/user";
import { connectToDatabase } from "@utils/db";
import sendConfirmationEmail from "@utils/sendConfirmationEmail";

const { NextResponse } = require("next/server");

export async function POST(request) {
  try {
    await connectToDatabase();
    const { teamName, leaderEmail, teamMemberEmail } = await request.json();
    const teamLeader = await User.findOne({ email: leaderEmail });
    const requestSentAlready = await ConfirmationRequest.findOne({
      teamName,
      leader: teamLeader,
    });
    if (requestSentAlready) {
      return NextResponse.json({
        success: false,
        status: 400,
        message: "Delete Previous Request First to Send New Request",
      });
    }
    sendConfirmationEmail(teamLeader, teamName, teamMemberEmail);

    const confirmationRequest = await ConfirmationRequest.create({
      teamName,
      leader: teamLeader,
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

export async function GET(request) {
  try {
    await connectToDatabase();
    const userId = "64c7a09f6b2e2b78bffa22ba";
    const loggedInUser = await User.findById(userId);
    const totalRequests = await ConfirmationRequest.find({
      teamMemberEmail: loggedInUser.email,
    });

    return NextResponse.json({
      success: true,
      status: 200,
      message: "Requests Retrieved Successfully",
      data: totalRequests,
    });
  } catch (error) {
    console.error("Error ", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
