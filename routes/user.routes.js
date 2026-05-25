import express from "express";

import { Router } from "express";
import { signUp, login } from "../controllers/auth.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const appRouter = Router();

appRouter.post("/signUp", signUp);
appRouter.post("/login", login);
appRouter.get("/test", authMiddleware, (req, res, next) => {
  res.json({
    message: "test route",
  });
});

export default appRouter;
