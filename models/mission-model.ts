import { Schema, model } from "mongoose";

const missionSchema = new Schema(
  {
    alt: { type: Number, required: true },
    speed: { type: Number, required: true },
    name: { type: String, required: true },
    waypoints: [
      {
        alt: { type: Number, required: true },
        lat: { type: Number, required: true },
        lng: { type: Number, required: true },
      },
    ],
    created_by: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    site: {
      type: Schema.Types.ObjectId,
      ref: "Site",
    },
  },
  { timestamps: true }
);

const Mission = model("Mission", missionSchema);

export default Mission;
