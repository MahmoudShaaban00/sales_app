import { Router } from "express";
import { register, signin } from "../controllers/auth.controllers.js";

const authRouter = Router();

authRouter.post("/register", register);
authRouter.post("/signin", signin);

export default authRouter;
