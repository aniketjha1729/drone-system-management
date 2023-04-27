"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const categorySchema = new mongoose_1.Schema({
    color: { type: String, required: true },
    name: { type: String, required: true },
    tag_name: { type: String, required: true },
    maker_name: { type: String, required: true },
}, { timestamps: true });
const Category = (0, mongoose_1.model)("Category", categorySchema);
exports.default = Category;
