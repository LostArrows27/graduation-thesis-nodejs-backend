import express from "express";

export const homeRouter = express.Router();

homeRouter.get("/", (req, res) => {
  res.json({ message: "Welcome to the home page" });
});
