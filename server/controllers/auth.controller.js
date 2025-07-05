import { loginSchema, signupSchema } from "../validator/form.validation.js";
import { hashPassword, verifyPassword } from "../utils/hash.js";
import {
  createNewSession,
  createUser,
  deleteSessionDataById,
  deleteSessionDataByIp,
  findUserByUserName,
  getSessionDataById,
  getSessionDataByIp,
} from "../services/auth.services.js";
import { setUpAuthCookies } from "../utils/auth.cookie.js";

export const getSignupPage = (req, res) => {
  try {
    if (req.user) return res.redirect("/");
    return res.status(200).render("signup", { errors: req.flash("errors") });
  } catch (err) {
    return res.status(404).send("Page Not Exist");
  }
};

export const getLoginPage = (req, res) => {
  try {
    if (req.user) return res.redirect("/");
    return res.status(200).render("login", { errors: req.flash("errors") });
  } catch (err) {
    return res.status(404).send("Page Not Exist");
  }
};

export const signup = async (req, res) => {
  try {
    if (req.user) return res.redirect("/");
    const { data, error } = signupSchema.safeParse(req.body);

    if (error) {
      req.flash("errors", error.errors[0].message);
      return res.redirect("/signup");
    }

    const { name, userName, email, password } = data;
    const hashedPassword = await hashPassword(password);

    const newUser = await createUser({
      name,
      userName,
      email,
      password: hashedPassword,
    });

    if (!newUser) {
      req.flash("errors", "User couldn't be created");
      return res.redirect("/signup");
    }

    return res.redirect("/login");
  } catch (err) {
    req.flash("errors", "Something went wrong");
    return res.redirect("/signup");
  }
};

export const login = async (req, res) => {
  try {
    if (req.user) return res.redirect("/");
    const { data, error } = loginSchema.safeParse(req.body);

    if (error) {
      req.flash("errors", error.errors[0].message);
      return res.redirect("/login");
    }

    const { userName, password } = data;

    const userData = await findUserByUserName(userName);

    if (!userData) {
      req.flash("errors", "Wrong User Name or Password");
      return res.redirect("/login");
    }

    const checkPassword = await verifyPassword({
      password,
      hashedPassword: userData.password,
    });

    if (!checkPassword) {
      req.flash("errors", "Wrong User Name or Password");
      return res.redirect("/login");
    }

    const newSession = await createNewSession({
      userId: userData.id,
      userAgent: req.headers["user-agent"],
      ip: req.clientIp,
    });

    if (!newSession) {
      req.flash("errors", "Session Couldn't be Created");
      return res.redirect("/login");
    }

    setUpAuthCookies(res, {
      name: userData.name,
      userName: userData.userName,
      email: userData.email,
      sessionId: newSession.id,
    });

    return res.redirect("/");
  } catch (err) {
    req.flash("errors", "Something went wrong");
    return res.redirect("/login");
  }
};

export const logout = async (req, res) => {
  if (!req.user) return res.redirect("/login");
  try {
    const { sessionId } = req.user;
    const sessionData = await getSessionDataById(sessionId);

    if (!sessionData || !sessionData.valid) return res.redirect("/login");

    await deleteSessionDataById(sessionId);

    res.clearCookie("access_token");
    res.clearCookie("refresh_token");
    return res.redirect("/login");
  } catch (err) {
    return res.status(404).send("Something went wrong");
  }
};
