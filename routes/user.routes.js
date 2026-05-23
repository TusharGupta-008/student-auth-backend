import express from "express";

import { Router } from "express";
import signUp from "../controllers/auth.controller.js";

const appRouter = Router();

appRouter.post("/signUp", signUp);

export default appRouter;
