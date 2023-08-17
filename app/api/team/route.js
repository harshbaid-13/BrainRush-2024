import { NextResponse } from "next/server";
import { connectToDatabase } from "@utils/db";
import User from "@models/user";
import Team from "@models/team";
import sendConfirmationEmail from "@utils/sendConfirmationEmail";
import ConfirmationRequest from "@models/confirmationRequest";

//get the details of a particuler team
export async function GET(req) {
  try {
    await connectToDatabase();
    const email = req.headers.get("Authorization");
    const user = await User.findOne({ email: email });
    const teamDetails = await Team.findOne({
      $or: [{ leader: user._id }, { teamMember: user._id }],
    }).populate(["leader", "teamMember"]);
    if (!teamDetails) {
      return NextResponse.json({
        success: false,
        message: "Team not found",
      });
    }
    const teamRequests = await ConfirmationRequest.findOne({
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

// Create Team
export async function POST(request) {
  try {
    await connectToDatabase();
    const email = request.headers.get("Authorization");
    const user = await User.findOne({ email: email });
    if (!user) {
      return NextResponse.json({ success: false, message: "User not found" });
    }
    const userId = user._id;
    const { teamName, teamMemberEmail } = await request.json();
    if (teamName.length > 30) {
      return NextResponse.json({
        success: false,
        message: "Team name should be less than 30 characters",
      });
    }
    if (teamMemberEmail.length > 50) {
      return NextResponse.json({
        success: false,
        message: "Email should be less than 50 characters",
      });
    }
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
      $or: [{ leader: userId }, { teamMember: userId }],
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

    if (teamMemberEmail === user.email) {
      return NextResponse.json(
        { success: false, message: "You can't add yourself as a member" },
        { status: 400 }
      );
    }

    const newTeam = await Team.create({
      teamName: teamName,
      leader: user,
    });
    sendConfirmationEmail(user, newTeam, teamMemberEmail, { event: 0 });

    const confirmationRequest = await ConfirmationRequest.create({
      team: newTeam,
      teamLeader: user,
      teamMemberEmail,
    });

    const teamId = newTeam._id;
    const createdTeam = await Team.findById(teamId).populate("leader");

    return NextResponse.json({
      success: true,
      message: "Team Created Successfully",
      data: createdTeam,
      confirmationRequest,
    });
  } catch (error) {
    console.error("Error ", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
