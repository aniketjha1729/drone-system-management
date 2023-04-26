"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllDrones = exports.createDrone = void 0;
const drone_model_1 = __importDefault(require("../models/drone-model"));
const createDrone = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { drone_type, name, maker_name } = req.body;
    if (!drone_type || !name || !maker_name)
        return res.status(200).json({ errors: [{ msg: "All fields are required" }] });
    try {
        const newDrone = new drone_model_1.default({
            drone_type,
            name,
            maker_name,
            created_by: req.user._id
        });
        const createdDrone = yield newDrone.save();
        return res.status(200).json(createdDrone);
    }
    catch (err) {
        return res.status(500).json({ errors: [{ msg: "Server Error" }] });
    }
});
exports.createDrone = createDrone;
const getAllDrones = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const allDrones = yield drone_model_1.default.find().populate("created_by", "name email");
    return res.status(200).json(allDrones);
});
exports.getAllDrones = getAllDrones;
