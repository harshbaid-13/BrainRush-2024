import { NextResponse } from "next/server";
import { connectToDatabase } from "@utils/db";
import Team from "@models/team";
import User from "@models/user";
import ConfirmationRequest from "@models/confirmationRequest";
import mongoose from "mongoose";

//kick a member
export async function PATCH(req, { params }) {
  try {
    await connectToDatabase();
    const { id } = params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ message: "Not a valid id" }, { status: 404 });
    }
    const email = req.headers.get("Authorization");
    const user = await User.findOne({ email: email });
    const { memberId } = await req.json();
    const member = await User.findById(memberId);

    if (!user) {
      return NextResponse.json(
        { message: "Not a valid user" },
        { status: 400 }
      );
    }
    if (!member) {
      return NextResponse.json(
        { message: "Not a valid member" },
        { status: 400 }
      );
    }
    const team = await Team.findOne({
      $and: [{ _id: id }, { leader: user._id }, { members: member._id }],
    }).populate(["leader", "members"]);
    if (!team) {
      return NextResponse.json({ message: "You are not leader of the team" });
    }
    if (team.payment) {
      return NextResponse.json(
        { message: "You can not remove the team member as payment done" },
        { status: 400 }
      );
    }
    const updatedMembers= team.members.filter((memberItem)=>memberItem===member)
    const newTeam = await Team.findByIdAndUpdate(
      team._id,
      {
        members:updatedMembers,
        $pull: {
          memberEmails: { email: member.email },
        },
      },
      { new: true }
    )
      .populate("leader")
      .populate("members");
 
    const requests= await ConfirmationRequest.find({team:newTeam})  
    return NextResponse.json({
      success: true,
      message: "Team member removed successfully",
      data: newTeam,
      requests
    });
  } catch (error) {
    console.error("Error Updating team:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

//teamLeave By the team member




//delete a team by team leader

export async function DELETE(req, { params }) {
  try {
    await connectToDatabase();
    const { id } = params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ message: "Not a valid id" }, { status: 404 });
    }
    const email = req.headers.get("Authorization");
    const user = await User.findOne({ email: email });
    if (!user) {
      return NextResponse.json(
        { message: "Not a valid user" },
        { status: 400 }
      );
    }
    const team = await Team.findOne({
      $and: [{ _id: id }, { leader: user?._id }],
    });
    if (!team) {
      return NextResponse.json(
        { message: "Not a valid team id " },
        { status: 404 }
      );
    }
    if (team?.payment) {
      return NextResponse.json(
        { message: "You can not delete this team as payment done" },
        { status: 400 }
      );
    }
    if (String(team.leader) === String(user._id)) {
      await ConfirmationRequest.deleteMany({ team: team._id });
      await team.deleteOne();
      return NextResponse.json({
        success: true,
        message: "Team deleted successfully",
      });
    } else {
      return NextResponse.json({
        message: "You are not allowed to delete this team",
      });
    }
  } catch (error) {
    console.error("Error deleting team:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}