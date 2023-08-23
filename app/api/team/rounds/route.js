import { NextResponse } from "next/server";
import { connectToDatabase } from "@utils/db";
import User from "@models/user";
import EventDay from "@models/eventDay";
import Team from "@models/team";
import sendConfirmationEmail from "@utils/sendConfirmationEmail";
import ConfirmationRequest from "@models/confirmationRequest";

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
        $or: [{ teamName: { $regex: search, $options: "i" } }],
      }
    : {};

  try {
    await connectToDatabase();
    const teams = await Team.find(queries);
    const teamIds = teams.map((team) => team._id);
    const filters = new Object();
    if (filter) filters[filter] = true;
    console.log(filters);
    const newQueries = {
      $and: [{ team: { $in: teamIds } }, filters],
    };
    const count = await EventDay.find(newQueries).count();
    const eventsOfAllTeams = await EventDay.find(newQueries)
      .skip(skip)
      .limit(limit)
      .populate({
        path: "team",
        populate: [{ path: "teamMember" }, { path: "leader" }],
      });
    return NextResponse.json({
      success: true,
      message: "All registered teams",
      count: Number(count),
      limit: Number(limit),
      teams: eventsOfAllTeams,
    });
  } catch (error) {
    console.error("Error fetching team names:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
