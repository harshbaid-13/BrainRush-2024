import ConfirmationRequest from "@models/confirmationRequest";
import Team from "@models/team";
import User from "@models/user";
import { connectToDatabase } from "@utils/db";
import sendConfirmationEmail from "@utils/sendConfirmationEmail";
import mongoose from "mongoose";

const { NextResponse } = require("next/server");

// Send Invite Request
export async function POST(req) {
  try {
    await connectToDatabase();
    const email = req.headers.get("authorization");
    const user = await User.findOne({ email: email });
    if (!user) {
      return NextResponse.json({ success: false, message: "User not found" });
    }
    const { teamMemberEmail } = await req.json();
    if (teamMemberEmail === user.email) {
      return NextResponse.json(
        { success: false, message: "You can't add yourself as a member" },
        { status: 400 }
      );
    }
    const teamLeaderId = user._id;
    const requestSentAlready = await ConfirmationRequest.findOne({
      teamLeader: teamLeaderId,
    });
    if (requestSentAlready) {
      return NextResponse.json({
        success: false,
        status: 400,
        message: "Delete Previous Request First to Send New Request",
      });
    }
    const team = await Team.findOne({ leader: teamLeaderId });
    if (team.teamMemberConfirmation) {
      return NextResponse.json({
        success: false,
        status: 400,
        message: "Team Full",
      });
    }

    sendConfirmationEmail(user, team, teamMemberEmail, { event: 0 });

    const confirmationRequest = await ConfirmationRequest.create({
      team,
      teamLeader: user,
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

// Get All LoggedIn User Requests
export async function GET(req) {
  try {
    await connectToDatabase();
    const email = req.headers.get("authorization");
    console.log({ email });
    const user = await User.findOne({ email: email });
    console.log({ user });
    if (!user) {
      return NextResponse.json({ success: false, message: "User not found" });
    }
    const teamLeaderId = user._id;
    if (!mongoose.Types.ObjectId.isValid(teamLeaderId)) {
      return NextResponse.json(
        { message: "Not a valid user" },
        { status: 404 }
      );
    }
    // const loggedInUser = await User.findById(userId);
    const totalRequests = await ConfirmationRequest.find({
      teamMemberEmail: user.email,
    }).populate(["team", "teamLeader"]);

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
