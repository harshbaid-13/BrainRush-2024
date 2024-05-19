import Team from "@models/team";
import User from "@models/user";
import ConfirmationRequest from "@models/confirmationRequest";
import { connectToDatabase } from "@utils/db";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

//accept invite request
export async function PUT(req, { params }) {
  try {
    await connectToDatabase();
    const email = req.headers.get("Authorization");
    const user = await User.findOne({ email: email });
    if (!user) {
      return NextResponse.json({ success: false, message: "User not found" });
    }
    const userId = user._id;
    const id = params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ message: "Invalid id" }, { status: 400 });
    }
    const confirmationRequest = await ConfirmationRequest.findOne({
      $and: [{ teamMemberEmail: email }, { _id: id }],
    })
      .populate("teamLeader")
      .populate("team");

    if (!confirmationRequest) {
      return NextResponse.json({
        success: false,
        message: "No response found",
      });
    }
    const userTeamExist = await Team.findOne({
      $or: [{ leader: userId }, { members: userId }],
    });

    if (userTeamExist) {
      return NextResponse.json({
        success: false,
        status: 400,
        message: "You have a team already",
      });
    }

    const team = await Team.findByIdAndUpdate(
      confirmationRequest?.team,
      {
        $push: { members: user },
      },
      {
        new: true,
      }
    );

    const memberEmails = team?.memberEmails?.map((item) =>
      item.email === email ? { email: email, confirmation: true } : item
    );
    console.log(memberEmails);
    const updatedTeam = await Team.findByIdAndUpdate(
      confirmationRequest?.team,
      {
        memberEmails,
      },
      {
        new: true,
      }
    ).populate("members").populate("leader");

    await ConfirmationRequest.findByIdAndDelete(confirmationRequest._id);
    const requests=await ConfirmationRequest.find({team:updatedTeam})

    return NextResponse.json({
      success: true,
      status: 200,
      message: "Team Request Accepted Successfully",
      data: updatedTeam,
      requests
    });
  } catch (error) {
    console.error("Error ", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

//Delete Invite request by the leader
export async function PATCH(req, { params }) {
  try {
    await connectToDatabase();
    const email = req.headers.get("Authorization");
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

    if (!sentRequest) {
      return NextResponse.json({
        success: false,
        status: 404,
        message: "No request found",
      });
    }
    const team = await Team.findOne({
      $and: [{ _id: sentRequest?.team }, { leader: user }],
    });

    const updatedMemberList = team.memberEmails?.filter(
      (items) => items.email !== sentRequest.teamMemberEmail
    );

    const updatedTeam = await Team.findByIdAndUpdate(
      team._id,
      { memberEmails: updatedMemberList },
      { new: true }
    );
    const requests = await ConfirmationRequest.find({ team: team._id });
    await ConfirmationRequest.findByIdAndDelete(sentRequest._id);

    return NextResponse.json({
      success: true,
      status: 200,
      message: "Request Deleted Successfully",
      data: updatedTeam,
      requests,
    });
  } catch (error) {
    console.error("Error ", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
