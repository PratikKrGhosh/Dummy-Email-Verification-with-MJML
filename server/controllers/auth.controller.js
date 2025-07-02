import { signupSchema } from "../validator/form.validation.js";
import { hashPassword } from "../utils/hash.js";
import { createUser } from "../services/auth.services.js";

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

export const login = (req, res) => {
  try {
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
