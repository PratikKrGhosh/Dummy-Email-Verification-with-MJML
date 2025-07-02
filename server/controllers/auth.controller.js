export const getSignupPage = (req, res) => {
  try {
    return res.status(200).render("signup");
  } catch (err) {
    return res.status(404).send("Page Not Exist");
  }
};

export const getLoginPage = (req, res) => {
  try {
    return res.status(200).render("login");
  } catch (err) {
    return res.status(404).send("Page Not Exist");
  }
};

export const signup = (req, res) => {
  try {
  } catch (err) {
    return res.status(404).send("Something went wrong");
  }
};

export const login = (req, res) => {
  try {
  } catch (err) {
    return res.status(404).send("Something went wrong");
  }
};

export const logout = (req, res) => {
  try {
  } catch (err) {
    return res.status(404).send("Something went wrong");
  }
};
