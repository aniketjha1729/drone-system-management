import { Request, Response } from 'express';
import Drone from '../models/drone-model';

export const createDrone = async (req: any, res: any) => {
  const { drone_type, name, maker_name } = req.body;
  if (!drone_type || !name || !maker_name)
    return res.status(200).json({ errors: [{ msg: "All fields are required" }] });
  try {
    const newDrone = new Drone({
      drone_type,
      name,
      maker_name,
      created_by: req.user._id
    });

    const createdDrone = await newDrone.save()
    return res.status(200).json(createdDrone)

  } catch (err) {
    return res.status(500).json({ errors: [{ msg: "Server Error" }] });
  }
};

export const getAllDrones = async (req: any, res: any) => {
  const allDrones = await Drone.find().populate("created_by", "name email")
  return res.status(200).json(allDrones)
}
