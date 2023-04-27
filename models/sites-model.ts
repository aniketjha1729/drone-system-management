import { Schema, model } from "mongoose";

const siteSchema = new Schema(
  {
    site_name: { type: String, required: true },
    position: {
      latitude: { type: String, required: true },
      longitude: { type: String, required: true },
    },
    created_by: { type: Schema.Types.ObjectId, ref: "User" },
    drones: [
      { type: Schema.Types.ObjectId, ref: "Drone" }
    ],
    missions: [
      { type: Schema.Types.ObjectId, ref: "Mission" }
    ]
  },
  { timestamps: true }
);

const Site = model("Site", siteSchema);

export default Site;
