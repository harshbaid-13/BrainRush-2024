import Team from "@models/team";
import User from "@models/user";
import { connectToDatabase } from "@utils/db";

const { NextResponse } = require("next/server");

export async function POST(request) {
  try {
    await connectToDatabase();
    const { teamName, userId } = await request.json();
    const teamLeader = await User.findById(userId);

    const existingTeam = await Team.findOne({ teamName });

    if (existingTeam) {
      return NextResponse.json(
        { success: false, message: "Team Name already exists" },
        { status: 400 }
      );
    }

    const createTeam = await Team.create({
      teamName: teamName,
      leader: teamLeader,
    });

    return NextResponse.json({
      success: true,
      message: "Team Created Successfully",
      data: createTeam,
    });
  } catch (error) {
    console.error("Error ", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
