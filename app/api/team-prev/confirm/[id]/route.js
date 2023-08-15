import Team from "@models/team";
import User from "@models/user";
import { connectToDatabase } from "@utils/db";
import ConfirmationRequest from "@models/confirmationRequest";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

// Get All LoggedIn User Requests
export async function GET(request, { params }) {
  try {
    await connectToDatabase();
    const userId = params.id;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return NextResponse.json(
        { message: "Not a valid user" },
        { status: 404 }
      );
    }
    const loggedInUser = await User.findById(userId);
    const totalRequests = await ConfirmationRequest.find({
      teamMemberEmail: loggedInUser.email,
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

// Delete Invite Request
export async function DELETE(request, { params }) {
  try {
    await connectToDatabase();
    const userId = params.id;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return NextResponse.json(
        { message: "Not a valid user" },
        { status: 404 }
      );
    }
    let sentRequest = await ConfirmationRequest.findOne({
      teamLeader: userId,
    });

    if (!sentRequest) {
      const teamMember = await User.findById(userId);
      sentRequest = await ConfirmationRequest.findOne({
        teamMemberEmail: teamMember.email,
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
