//delete team by leader
import { NextResponse } from "next/server";
import Team from "@models/team";
import { connectToDatabase } from "@utils/db";

export async function DELETE(request, { params }) {
  try {
    await connectToDatabase();

    const { userId } = params.id;

    const team = await Team.findOne({ leader: userId });

    if (!team) {
      return NextResponse.json(
        { message: "Team not found for the provided leaderId" },
        { status: 404 }
      );
    }

    await team.deleteOne();

    return NextResponse.json({
      success: true,
      message: "Team deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting team:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
