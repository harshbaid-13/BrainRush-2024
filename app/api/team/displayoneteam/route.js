import { NextResponse } from "next/server";
import Team from "@models/team";
import { connectToDatabase } from "@utils/db";
import { Types } from "mongoose";

export async function GET(request) {
  try {
    await connectToDatabase();
    const userId = "64c6b56a269738d74ea5193f";

    let team = await Team.aggregate([
      {
        $match: {
          leader: new Types.ObjectId("64c6b56a269738d74ea5193f"),
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "leader",
          foreignField: "_id",
          as: "leader",
        },
      },
      {
        $unwind: {
          path: "$leader",
        },
      },
    ]);

    if (!team) {
      team = await Team.findOne({ teamMember: userId });
    }
    if (!team) {
      return NextResponse.json(
        { message: "Team not found for the provided leaderId or teamMemberId" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: team });
  } catch (error) {
    console.error("Error fetching team:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
