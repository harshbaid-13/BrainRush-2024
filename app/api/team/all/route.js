import { NextResponse } from "next/server";
import { connectToDatabase } from "@utils/db";
import Team from "@models/team";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search") || "";
  const page = searchParams.get("page") || 1;
  const limit = 10;
  const skip = (page - 1) * limit;

  const queries = search
    ? {
        $or: [{ teamName: { $regex: search, $options: "i" } }],
      }
    : {};

  try {
    await connectToDatabase();
    const teams = await Team.find(queries)
      .skip(skip)
      .limit(limit)
      .populate(["leader", "teamMember"]);

    const count = await Team.countDocuments();

    return NextResponse.json({
      success: true,
      message: "All registered teams",
      count: Number(count),
      limit: Number(limit),
      currentPage: Number(page),
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
