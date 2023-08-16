import Team from "@models/team";
import User from "@models/user";
import { connectToDatabase } from "@utils/db";
import ConfirmationRequest from "@models/confirmationRequest";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import sendConfirmationEmail from "@utils/sendConfirmationEmail";

// Delete Invite Request
export async function PATCH(req, { params }) {
  try {
    await connectToDatabase();
    const email = req.headers.get("authorization");
    const user = await User.findOne({ email: email });
    if (!user) {
      return NextResponse.json({ success: false, message: "User not found" });
    }
    const userId = user._id;
    const requestId = params.id;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return NextResponse.json(
        { message: "Not a valid user" },
        { status: 404 }
      );
    }
    let sentRequest = await ConfirmationRequest.findOne({
      $and: [{ _id: requestId }, { teamLeader: userId }],
    });

    console.log({ sentRequest });

    if (!sentRequest) {
      return NextResponse.json({
        success: false,
        status: 404,
        message: "No request found",
      });
    }

    await sentRequest.deleteOne();

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

// Accept Invite Request
export async function PUT(req, { params }) {
  try {
    await connectToDatabase();
    const email = req.headers.get("authorization");
    const user = await User.findOne({ email: email });
    if (!user) {
      return NextResponse.json({ success: false, message: "User not found" });
    }
    const userId = user._id;
    const id = params.id;
    const confirmationRequest = await ConfirmationRequest.findById(id);

    const userTeamExist = await Team.findOne({ leader: userId });

    if (userTeamExist) {
      return NextResponse.json({
        success: false,
        status: 400,
        message: "You have a team already",
      });
    }

    sendConfirmationEmail(
      confirmationRequest?.teamLeader,
      confirmationRequest?.team,
      confirmationRequest?.teamLeader?.email,
      { event: 1 }
    );

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
export async function DELETE(req, { params }) {
  try {
    await connectToDatabase();
    const email = req.headers.get("authorization");
    const user = await User.findOne({ email: email });
    if (!user) {
      return NextResponse.json({ success: false, message: "User not found" });
    }
    const id = params.id;
    const confirmationRequest = await ConfirmationRequest.findById(id)
      .populate("teamLeader")
      .populate("team");
    sendConfirmationEmail(
      confirmationRequest?.teamLeader,
      confirmationRequest.team,
      confirmationRequest.teamLeader.email,
      { event: 3 }
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
