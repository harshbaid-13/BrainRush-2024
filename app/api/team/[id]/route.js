import Team from "@models/team";

export async function GET(request, { params }) {
  try {
    await connectToDatabase();
    const userId = params.id;
    let team = await Team.findOne({ leader: params.id }).populate([
      "leader",
      "teamMember",
    ]);
    if (!team) {
      team = await Team.findOne({ teamMember: params.id }).populate([
        "leader",
        "teamMember",
      ]);
    }
    if (!team) {
      return NextResponse.json({ success: false, message: "Team not found" });
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
