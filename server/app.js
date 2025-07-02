import express from "express";
import path from "path";
import session from "express-session";
import flash from "connect-flash";
import cookieParser from "cookie-parser";
import requestIp from "request-ip";

import authRouter from "./routes/auth.route.js";
import authMiddleware from "./middlewares/auth.middleware.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({ secret: "my_secret", resave: true, saveUninitialized: false })
);
app.use(flash());
app.use(cookieParser());
app.use(requestIp.mw());

app.set("view engine", "ejs");
app.set("views", path.join(import.meta.dirname, "..", "client", "views"));
app.use(
  express.static(path.join(import.meta.dirname, "..", "client", "public"))
);

app.use(authMiddleware);
app.use((req, res, next) => {
  res.locals.user = req.user;
  return next();
});

app.use("/", authRouter);

app.get("/", (req, res) => {
  res.status(200).render("index");
});

export default app;
