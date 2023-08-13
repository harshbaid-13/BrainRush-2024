import { NextResponse } from "next/server";
import { connectToDatabase } from "@utils/db";
import User from "@models/user";
import Team from "@models/team";

// Get All Teams
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search") || "";
  const page = searchParams.get("page") || 1;
  const filter = searchParams.get("filter") || null;
  const limit = 10;
  const skip = (page - 1) * limit;

  const queries = search
    ? {
        $or: [
          { name: { $regex: search, $options: "i" } },
          { email: { $regex: search, $options: "i" } },
        ],
      }
    : {};

  try {
    await connectToDatabase();
    const users = await User.find(queries);
    const userIds = users.map((user) => user._id);
    const newQueries = {
      $and: [
        {
          $or: [
            { leader: { $in: userIds } },
            { teamMember: { $in: userIds } },
            { teamName: { $regex: search, $options: "i" } },
          ],
        },
      ],
    };
    if (filter) {
      newQueries.$and.push({ teamMemberConfirmation: !filter });
    }
    const teams = await Team.find(newQueries)
      .skip(skip)
      .limit(limit)
      .populate(["leader", "teamMember"]);

    const count = await Team.find(newQueries).count();

    return NextResponse.json({
      success: true,
      message: "All registered teams",
      count: Number(count),
      limit: Number(limit),
      teams: teams,
    });
  } catch (error) {
    console.error("Error fetching team names:", error);
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
    const { teamName, userId } = await request.json();
    const teamLeader = await User.findById(userId);

    const existingTeam = await Team.findOne({ teamName });

    if (existingTeam) {
      return NextResponse.json(
        { success: false, message: "Team Name already exists" },
        { status: 400 }
      );
    }

    const team = await Team.create({
      teamName: teamName,
      leader: teamLeader,
    });

    const teamId = team._id;
    const createdTeam = await Team.findById(teamId).populate("leader");

    return NextResponse.json({
      success: true,
      message: "Team Created Successfully",
      data: createdTeam,
    });
  } catch (error) {
    console.error("Error ", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
