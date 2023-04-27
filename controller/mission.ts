import Mission from "../models/mission-model";

export const createMission = async (req: any, res: any) => {
  const { alt, speed, name, waypoints } = req.body;
  if (!alt || !speed || !name || !waypoints) {
    return res
      .status(200)
      .json({ errors: [{ msg: "All fields are required" }] });
  }
  try {
    const newMission = new Mission({
      alt,
      speed,
      name,
      waypoints,
      created_by: req.user._id,
    });

    const createdMission = await newMission.save();
    return res.status(200).json(createdMission);
  } catch (err) {
    return res.status(500).json({ errors: [{ msg: "Server Error" }] });
  }
};

export const getAllMissions = async (req: any, res: any) => {
  const allSites = await Mission.find();
  return res.status(200).json(allSites);
};

export const deleteSite = async (req: any, res: any) => {
  const missionId = req.params.siteId;
  try {
    await Mission.findOneAndDelete({ _id: missionId });
    return res.status(200).json({ msg: "Site Delete Successfully" });
  } catch (err) {
    return res.status(404).json({ msg: "This site does not exist" });
  }
};
