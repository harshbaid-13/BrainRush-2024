import { NextResponse } from "next/server";
import { connectToDatabase } from "@utils/db";
import User from "@models/user";
import Team from "@models/team";

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
