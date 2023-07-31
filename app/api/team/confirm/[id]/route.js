import User from "@models/user";
import { connectToDatabase } from "@utils/db";
import ConfirmationRequest from "@models/confirmationRequest";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    await connectToDatabase();
    const userId = params.id;
    const loggedInUser = await User.findById(userId);
    const totalRequests = await ConfirmationRequest.find({
      teamMemberEmail: loggedInUser.email,
    });

    return NextResponse.json({
      success: true,
      status: 200,
      message: "Requests Retrieved Successfully",
      data: totalRequests,
    });
  } catch (error) {
    console.error("Error ", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    await connectToDatabase();
    const userId = params.id;
    let sentRequest = await ConfirmationRequest.findOne({
      teamLeader: userId,
    });

    if (!sentRequest) {
      const teamMember = await User.findById(userId);
      sentRequest = await ConfirmationRequest.findOne({
        teamMemberEmail: teamMember.email,
      });
      console.log({ teamMember });
    }

    console.log({ sentRequest });

    await sentRequest.deleteOne();

    return NextResponse.json({
      success: true,
      status: 200,
      message: "Request Deleted Successfully",
    });
  } catch (error) {
    console.error("Error ", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
