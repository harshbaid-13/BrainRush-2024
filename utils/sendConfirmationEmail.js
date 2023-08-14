import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const subject = [
  "Let's Conquer Kodikas Together! 🚀 Join my team - <teamName>",
];

const text = [
  "Hey Friend,\nHope you're doing awesome! I've got some super exciting news to share - I'm putting together a dream team for the upcoming Kodikas - \"Innovate Your Code Game!\" 🎉\n\nKnowing your coding wizardry and creative knack, I couldn't resist inviting you to be a part of my team. Together, I'm sure we'll rock this event and bag those fantastic prizes they're dangling in front of us. 💪🏆\n- All the juicy details: https://kodikas.vercel.app/\nI'm convinced that our combined talents will be unstoppable. But hold up, here's the deal to officially seal the pact:\n1. Go to https://kodikas.vercel.app/\n2. Sign In and complete your profile. 🧑‍💻\n3. Click on the Join Team. 🤝\n4. Find our team's invite and give it a high-five by hitting \"Accept.\" 🙌\n\nThis event is our canvas, and together we're going to paint some incredible code magic. 🎨✨\nCan't wait to see you on the team!\n\nCheers,\n<leaderName>",
];

// Send email to the team member
const sendConfirmationEmail = async (
  teamLeader,
  team,
  teamMemberEmail,
  event
) => {
  const subject = subject[event.event];
  const text = text[event.event];
  const mailOptions = {
    from: process.env.EMAIL,
    to: teamMemberEmail,
    subject: subject.replace("<teamName>", team.teamName),
    text: text.replace("<leaderName>", teamLeader.name),
  };
  await transporter.sendMail(mailOptions);
};

export default sendConfirmationEmail;
