import { NextResponse } from "next/server";
import User from "@models/user";
import Team from "@models/team";
import ConfirmationRequest from "@models/confirmationRequest";
import { connectToDatabase } from "@utils/db";

//get a particuler team details

export async function GET(req) {
  try {
    await connectToDatabase();
    const email = req.headers.get("Authorization");
    const user = await User.findOne({ email: email });
    const teamDetails = await Team.findOne({
      $or: [{ leader: user._id }, { members: user._id }],
    }).populate(["leader", "members"]);
    if (!teamDetails) {
      return NextResponse.json({
        success: false,
        message: "Team not found",
      });
    }
    const teamRequests = await ConfirmationRequest.find({
      team: teamDetails?._id,
    });
    return NextResponse.json({
      success: true,
      data: teamDetails,
      request: teamRequests,
    });
  } catch (error) {
    console.error("Error fetching team:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

//create a new Team
export async function POST(request) {
  try {
    await connectToDatabase();
    const email = request.headers.get("Authorization");
    const user = await User.findOne({ email: email });
    if (!user) {
      return NextResponse.json({ success: false, message: "User not found" });
    }
    const userId = user._id;
    const { teamName, teamMemberEmails } = await request.json();
    //get the leader id
    // const teamLeader = await User.findById(userId);
    //check if the team name already exists
    const existingTeam = await Team.findOne({ teamName });
    //if exists then can not create another team
    if (existingTeam) {
      return NextResponse.json({
        success: false,
        message: "Team Name already exists",
      });
    }

    //if the current user is already a member or a leader
    const team = await Team.findOne({
      $or: [{ leader: userId }, { members: userId }],
    });
    //then can not create another team
    if (team) {
      return NextResponse.json(
        {
          message: "You already have a team",
          success: false,
        },
        { status: 400 }
      );
    }
    if (
      teamMemberEmails[0] === user.email ||
      teamMemberEmails[1] === user.email ||
      teamMemberEmails[0] === teamMemberEmails[1]
    ) {
      return NextResponse.json(
        { success: false, message: "You can't add yourself as a member" },
        { status: 400 }
      );
    }
    const teamMembers = teamMemberEmails.map((email) => ({
      email: email,
      confirmation: false,
    }));
    const newTeam = await Team.create({
      teamName: teamName,
      leader: user,
      memberEmails: teamMembers,
    });
    // sendConfirmationEmail(user, newTeam, teamMemberEmail, { event: 0 });

    const confirmationRequest1 = await ConfirmationRequest.create({
      team: newTeam,
      teamLeader: user,
      teamMemberEmail: teamMemberEmails[0],
    });
    const confirmationRequest2 = await ConfirmationRequest.create({
      team: newTeam,
      teamLeader: user,
      teamMemberEmail: teamMemberEmails[1],
    });

    const teamId = newTeam._id;
    const createdTeam = await Team.findById(teamId).populate("leader");

    return NextResponse.json({
      success: true,
      message: "Team Created Successfully",
      data: createdTeam,
      confirmationRequest: [confirmationRequest1, confirmationRequest2],
    });
  } catch (error) {
    console.error("Error ", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
