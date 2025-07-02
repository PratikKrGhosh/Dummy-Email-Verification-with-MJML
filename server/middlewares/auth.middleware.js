import { verifyToken } from "../utils/token.js";

const authMiddleware = async (req, res, next) => {
  const accessToken = req.cookies.access_token;

  if (accessToken) {
    const decodedToken = verifyToken(accessToken);
    req.user = decodedToken;
    return next();
  }
  req.user = null;
  return next();
};

export default authMiddleware;
