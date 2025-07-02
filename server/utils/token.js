import jwt from "jsonwebtoken";
import env from "../config/env.js";

export const signToken = (data, time) => {
  try {
    return jwt.sign(data, env.jwt_key, { expiresIn: time });
  } catch (err) {
    return null;
  }
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, env.jwt_key);
  } catch (err) {
    return false;
  }
};
