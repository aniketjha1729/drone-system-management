import { Schema, model } from "mongoose";

const droneSchema = new Schema(
  {
    drone_type: { type: String, required: true },
    name: { type: String, required: true },
    maker_name: { type: String, required: true },
    created_by: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Drone = model("Drone", droneSchema);

export default Drone;
