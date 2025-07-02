import { loginSchema, signupSchema } from "../validator/form.validation.js";
import { hashPassword, verifyPassword } from "../utils/hash.js";
import { createUser, findUserByUserName } from "../services/auth.services.js";

export const getSignupPage = (req, res) => {
  try {
    return res.status(200).render("signup", { errors: req.flash("errors") });
  } catch (err) {
    return res.status(404).send("Page Not Exist");
  }
};

export const getLoginPage = (req, res) => {
  try {
    return res.status(200).render("login", { errors: req.flash("errors") });
  } catch (err) {
    return res.status(404).send("Page Not Exist");
  }
};

export const signup = async (req, res) => {
  try {
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

    return res.redirect("/");
  } catch (err) {
    req.flash("errors", "Something went wrong");
    return res.redirect("/login");
  }
};

export const logout = (req, res) => {
  try {
  } catch (err) {
    return res.status(404).send("Something went wrong");
  }
};
