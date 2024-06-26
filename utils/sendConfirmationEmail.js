import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const subjects = [
  "Let's Conquer BrainRush Together! 🚀 Join my team - <teamName>",
  "Registration Confirmed for BrainRush - Heroes of Intellect🎉",
  "You are Removed from team",
  "Regarding BrainRush2k24 Team Member Request",
];

const texts = [
  "Hey Friend,\nHope you're doing awesome! I've got some super exciting news to share - I'm putting together a dream team for the upcoming BrainRush - \"Innovate Your Code Game!\" 🎉\n\nKnowing your coding wizardry and creative knack, I couldn't resist inviting you to be a part of my team. Together, I'm sure we'll rock this event and bag those fantastic prizes they're dangling in front of us. 💪🏆\n- All the juicy details: https://BrainRush.vercel.app/\nI'm convinced that our combined talents will be unstoppable. But hold up, here's the deal to officially seal the pact:\n1. Go to https://BrainRush.vercel.app/\n2. Sign In and complete your profile. 🧑‍💻\n3. Click on the Join Team. 🤝\n4. Find our team's invite and give it a high-five by hitting \"Accept.\" 🙌\n\nThis event is our canvas, and together we're going to paint some incredible code magic. 🎨✨\nCan't wait to see you on the team!\n\nCheers,\n<leaderName>",
  "Hey <leaderName>,\n I hope you're having a splendid day! 😀\n\nWe are excited to inform you that your team for BrainRush 2k24 has been successfully registered and your team is now full! 🌟\n\nNow that your team is complete, we kindly request you to visit CSE Department 3rd Floor at your earliest convenience to complete the payment process.This payment finalizes your team's participation and secures your spot in BrainRush 2k24.\n\nYour ticket for payment \n\n https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=<teamid>\n\nPlease bring this QR with you when going for payment\n\nWe eagerly await your presence at the event. Get ready to code, compete and conquer! ⌨️🏆\nBest Regards, \nTeam BrainRush 2k24 🖥️",
  "Hey Friend,\n\nWe are sorry to inform you that you have been removed from the team <teamName> for the event BrainRush2k24. 😔\n\nWe hope you understand that this decision was not taken lightly. We wish you the best of luck in your future endeavors. 🤞\n\nBest Regards, \nTeam BrainRush2k24 🖥️",
  "Hey <leaderName> ¡ ✨\n\nI hope this message finds you well.We wanted to inform you that the <teamMember> you had requested to join the team for the BrainRush2k24 has unfortunately declined the invitation.☹️\nDeclined invitation?🥺No WORRIES!!We believe in giving second chances and you’ve got plenty!!! 😉\nYou can still continue sending requests to other interested participants for the event. 👨🏻‍💻\n\nThe entire team of BrainRush will be available to help you if you need any!! Don't lose hope!🫂\nYou still have time! \n\nSee you on 24th August! 🎉\n\nWe appreciate your dedication and enthusiasm to make the team as competitive as possible. If you need any assistance or further information, please don't hesitate to reach out! 🤓\n\nBest Regards ✨\nTeam BrainRush2k24 🖥️",
];

// Send email to the team member
const sendConfirmationEmail = async (teamLeader, team, email, event) => {
  const subject = subjects[event.event];
  const text = texts[event.event];
  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: subject.replace("<teamName>", team.teamName),
    text: text
      .replace("<leaderName>", teamLeader?.name)
      .replace("<teamName>", team?.teamName)
      .replace("<teamMember>", team?.teamMember?.name)
      .replace("<teamid>", team?._id),
  };
  await transporter.sendMail(mailOptions);
};

export default sendConfirmationEmail;
