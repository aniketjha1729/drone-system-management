import { Schema, model } from "mongoose";

const siteSchema = new Schema(
  {
    color: { type: String, required: true },
    name: { type: String, required: true },
    tag_name: { type: String, required: true },
    maker_name: { type: String, required: true },
  },
  { timestamps: true }
);

const Site = model("Site", siteSchema);

export default Site;
