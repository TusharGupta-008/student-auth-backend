import express from "express";

import { Router } from "express";
import { signUp, login } from "../controllers/auth.controller.js";

const appRouter = Router();

appRouter.post("/signUp", signUp);
appRouter.post("/login", login);

export default appRouter;
