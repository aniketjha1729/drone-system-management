import jwt from "jsonwebtoken";
import User from "../models/user-modal";
const authKey = process.env.SECRET_AUTH_KEY;

export const isUserAuth = (req: any, res: any, next: any) => {
  const token = req.header("Bearer");
  if (token) {
    jwt.verify(token, `${authKey}`, (err: any, payload: any) => {
      if (err) {
        return res.status(401).json({ errors: [{ msg: "Invalid token" }] });
      }
      const { _id } = payload;
      User.findById(_id)
        .select("-password")
        .then((userdata) => {
          req.user = userdata;
          next();
        });
    });
  } else {
    return res.status(401).json({ errors: [{ msg: "Token required" }] });
  }
};
