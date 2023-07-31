import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Send email to the team member
const sendConfirmationEmail = async (teamLeader, team, teamMemberEmail) => {
  const mailOptions = {
    from: process.env.EMAIL,
    to: teamMemberEmail,
    subject: "Team Invitation",
    text: `Hey, You have been invited to join ${team.teamName} team of ${teamLeader.name} for Kodikas 2K23. Please confirm your participation by clicking on the link below. \n\n http://localhost:3000/confirm/${teamLeader._id} \n\n If you have any queries, please contact ${teamLeader.name} at ${teamLeader.email} \n\n Regards, \n Kodikas Team`,
  };
  await transporter.sendMail(mailOptions);
};

export default sendConfirmationEmail;
