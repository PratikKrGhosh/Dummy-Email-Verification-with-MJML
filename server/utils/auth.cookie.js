import {
  ACCESS_TOKEN_EXPIRY,
  MILI_SEC,
  REFRESH_TOKEN_EXPIRY,
} from "../config/const.js";
import { signToken } from "./token.js";

export const setUpAuthCookies = (res, { name, userName, email, sessionId }) => {
  const tokenData = { name, userName, email, sessionId };

  const preConfig = {
    httpOnly: true,
    secure: true,
  };

  const accessToken = signToken(tokenData, ACCESS_TOKEN_EXPIRY / MILI_SEC);
  const refreshToken = signToken(
    { sessionId },
    REFRESH_TOKEN_EXPIRY / MILI_SEC
  );

  res.cookie("access_token", accessToken, {
    ...preConfig,
    maxAge: ACCESS_TOKEN_EXPIRY,
  });

  res.cookie("refresh_token", refreshToken, {
    ...preConfig,
    maxAge: REFRESH_TOKEN_EXPIRY,
  });

  return accessToken;
};
