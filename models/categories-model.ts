import { Schema, model } from "mongoose";

const categorySchema = new Schema(
  {
    color: { type: String, required: true },
    name: { type: String, required: true },
    tag_name: { type: String, required: true },
    maker_name: { type: String, required: true },
  },
  { timestamps: true }
);

const Category = model("Category", categorySchema);

export default Category;
