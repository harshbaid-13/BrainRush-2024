import Team from "@models/team";
import { connectToDatabase } from "@utils/db";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  try {
    await connectToDatabase();
    console.log(params);
    const teams = await Team.findOne({ leader: params.id });
    return NextResponse.json(teams.id, { status: 200 });
    // return new NextResponse.json(teams, { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify("Failed to Get team details!"), {
      status: 500,
    });
  }
};
