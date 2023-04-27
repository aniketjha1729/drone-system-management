import Site from '../models/sites-model';

export const createSites = async (req: any, res: any) => {
  const { site_name, latitude, longitude } = req.body;
  if (!site_name || !latitude || !longitude)
    return res.status(200).json({ errors: [{ msg: "All fields are required" }] });
  try {
    const position = {
      latitude,
      longitude
    }
    const newDrone = new Site({
      site_name,
      position,
      created_by: req.user._id
    });

    const createdDrone = await newDrone.save()
    return res.status(200).json(createdDrone)

  } catch (err) {
    return res.status(500).json({ errors: [{ msg: "Server Error" }] });
  }
};

export const getAllSites = async (req: any, res: any) => {
  const allSites = await Site.find().populate("created_by", "name email")
  return res.status(200).json(allSites)
}

export const getSiteById = async (req: any, res: any) => {
  const siteId = req.params.siteId;
  const allSites = await Site.findById(siteId).populate("created_by", "name email").populate("drones missions", "drone_type maker_name name speed alt")
  return res.status(200).json(allSites)
}

export const updateSite = async (req: any, res: any) => {
  const siteId = req.params.siteId;
  const { site_name, latitude, longitude } = req.body;

  try {
    const site = await Site.findByIdAndUpdate(siteId, { site_name, latitude, longitude }, { new: true, lean: true })
    return res.status(200).json(site)
  } catch (err) {
    return res.status(404).json({ msg: "This site does not exist" });
  }
}

export const deleteSite = async (req: any, res: any) => {
  const siteId = req.params.siteId;
  try {
    await Site.findOneAndDelete({ _id: siteId })
    return res.status(200).json({ msg: "Site Deleted Successfully" })
  } catch (err) {
    return res.status(404).json({ msg: "This site does not exist" });
  }
}

export const deleteDrone = async (req: any, res: any) => {
  const siteId = req.params.siteId;
  try {
    await Site.findByIdAndUpdate({ _id: siteId }, { $pull: { drones: req.params.droneId } }, { new: true, lean: true })
    return res.status(200).json({ msg: "Drone Deleted Successfully" })
  } catch (err) {
    return res.status(404).json({ msg: "This site does not exist" });
  }
}

export const deleteMission = async (req: any, res: any) => {
  const siteId = req.params.siteId;
  try {
    await Site.findByIdAndUpdate({ _id: siteId }, { $pull: { missions: req.params.missionId } }, { new: true, lean: true })
    return res.status(200).json({ msg: "Mission Deleted Successfully" })
  } catch (err) {
    return res.status(404).json({ msg: "This site does not exist" });
  }
}

export const addDroneToSite = async (req: any, res: any) => {
  const siteId = req.params.siteId;
  try {
    const site = await Site.findByIdAndUpdate(siteId, { $push: { drones: req.params.droneId } }, { new: true, lean: true })
    return res.status(200).json(site)
  } catch (err) {
    return res.status(404).json({ msg: "This site does not exist" });
  }
}

export const addMissionToSite = async (req: any, res: any) => {
  const siteId = req.params.siteId;
  try {
    const site = await Site.findByIdAndUpdate(siteId, { $push: { missions: req.params.missionId } }, { new: true, lean: true })
    return res.status(200).json(site)
  } catch (err) {
    return res.status(404).json({ msg: "This site does not exist" });
  }
}

export const getDrones = async (req: any, res: any) => {
  const siteId = req.params.siteId;
  console.log("🚀 ~ file: site.ts:75 ~ getDrones ~ siteId:", siteId)
  try {
    const site = await Site.findById({ _id: siteId }).populate("drones", "drone_type name maker_name").select("-_id -missions -created_by")
    return res.status(200).json(site)
  } catch (err) {
    return res.status(404).json({ msg: "This site does not exist" });
  }
}


export const getMissions = async (req: any, res: any) => {
  const siteId = req.params.siteId;
  console.log("🚀 ~ file: site.ts:75 ~ getDrones ~ siteId:", siteId)
  try {
    const site = await Site.findById({ _id: siteId }).populate("missions", "name alt").select("-_id -drones -created_by")
    return res.status(200).json(site)
  } catch (err) {
    return res.status(404).json({ msg: "This site does not exist" });
  }
}