import { Router } from "express";
import { signUp } from "../controllers/auth/sign_up.js";
import { signIn } from "../controllers/auth/sign_in.js";

const authRouter = Router();

authRouter.post("/auth/sign-up", signUp);

authRouter.post("/auth/sign-in", signIn);

export default authRouter;
