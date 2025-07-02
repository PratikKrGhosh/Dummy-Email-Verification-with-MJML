import { getUserDataUsingSessionId } from "../services/auth.services.js";
import { setUpAuthCookies } from "../utils/auth.cookie.js";
import { verifyToken } from "../utils/token.js";

const authMiddleware = async (req, res, next) => {
  const accessToken = req.cookies.access_token;
  const refreshToken = req.cookies.refresh_token;

  if (accessToken) {
    const decodedToken = verifyToken(accessToken);
    req.user = decodedToken;
    return next();
  }

  if (refreshToken) {
    const decodedRefreshToken = verifyToken(refreshToken);
    const userData = await getUserDataUsingSessionId(
      decodedRefreshToken.sessionId
    );

    const newAccessToken = setUpAuthCookies(res, {
      name: userData.name,
      userName: userData.userName,
      email: userData.email,
      sessionId: userData.sessionId,
    });

    req.user = newAccessToken;
    return next();
  }

  req.user = null;
  return next();
};

export default authMiddleware;
