import { NextResponse } from "next/server";
import { connectToDatabase } from "@utils/db";
import User from "@models/user";
import Team from "@models/team";
import sendConfirmationEmail from "@utils/sendConfirmationEmail";
import ConfirmationRequest from "@models/confirmationRequest";

// // Get All Teams
// export async function GET(request) {
//   const { searchParams } = new URL(request.url);
//   const search = searchParams.get("search") || "";
//   const page = searchParams.get("page") || 1;
//   const filter = searchParams.get("filter") || null;
//   const limit = 10;
//   const skip = (page - 1) * limit;

//   const queries = search
//     ? {
//         $or: [
//           { name: { $regex: search, $options: "i" } },
//           { email: { $regex: search, $options: "i" } },
//         ],
//       }
//     : {};

//   try {
//     await connectToDatabase();
//     const users = await User.find(queries);
//     const userIds = users.map((user) => user._id);
//     const newQueries = {
//       $and: [
//         {
//           $or: [
//             { leader: { $in: userIds } },
//             { teamMember: { $in: userIds } },
//             { teamName: { $regex: search, $options: "i" } },
//           ],
//         },
//       ],
//     };
//     if (filter) {
//       newQueries.$and.push({ teamMemberConfirmation: !filter });
//     }
//     const teams = await Team.find(newQueries)
//       .skip(skip)
//       .limit(limit)
//       .populate(["leader", "teamMember"]);

//     const count = await Team.find(newQueries).count();

//     return NextResponse.json({
//       success: true,
//       message: "All registered teams",
//       count: Number(count),
//       limit: Number(limit),
//       teams: teams,
//     });
//   } catch (error) {
//     console.error("Error fetching team names:", error);
//     return NextResponse.json(
//       { message: "Internal Server Error" },
//       { status: 500 }
//     );
//   }
// }

// Create Team
export async function POST(request) {
  try {
    await connectToDatabase();
    const email = request.headers.get("Authorization");
    console.log({ email });
    const user = await User.findOne({ email: email });
    if (!user) {
      return NextResponse.json({ success: false, message: "User not found" });
    }
    const userId = user._id;
    const { teamName, teamMemberEmail } = await request.json();
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
