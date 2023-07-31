import { Schema, model, models } from "mongoose";

const confirmationRequestSchema = new Schema(
  {
    teamName: {
      type: String,
      required: [true, "Team Name is required"],
    },
    leader: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Team Leader is required"],
    },
    teamMemberEmail: {
      type: String,
      required: [true, "Team Member Email is required"],
    },
    teamMemberConfirmation: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const ConfirmationRequest =
  (models && models.ConfirmationRequest) ||
  model("ConfirmationRequest", confirmationRequestSchema);
export default ConfirmationRequest;
