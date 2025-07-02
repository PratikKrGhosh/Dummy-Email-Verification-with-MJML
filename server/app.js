import express from "express";
import path from "path";

import authRouter from "./routes/auth.route.js";

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(import.meta.dirname, "..", "client", "views"));
app.use(
  express.static(path.join(import.meta.dirname, "..", "client", "public"))
);

app.use("/", authRouter);

app.get("/", (req, res) => {
  res.status(200).send("Home Page");
});

export default app;
