import { Schema, model, models } from "mongoose";

const quizSchema = new Schema(
  {
    team: {
      type: Schema.Types.ObjectId,
      ref: "Team",
    },
    quizStarted: {
      type: Boolean,
      default: false,
    },
    quizEnded: {
      type: Boolean,
      default: false,
    },
    responses: [
      {
        question: {
          type: Schema.Types.ObjectId,
          ref: "Question",
        },
        answer: {
          type: String,
          required: true,
        },
      },
    ],
    // startTime: {
    //   type: Date,
    //   default: Date.now,
    // },
  },
  { timestamps: true }
);
const Quiz = (models && models.Quiz) || model("Quiz", quizSchema);
export default Quiz;
/**
 *
 *
 *
 */
