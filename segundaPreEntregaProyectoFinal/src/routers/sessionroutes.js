import { Router } from "express";
import {createHashValue, isValidPasswd} from "../utils/encrypt.js"
import passport from "passport";
import { gitHubCallback, login, loginGitHUb, register, logout} from "../controller/SessionController.js";

const router = Router();

router.get("/logout", logout);

router.post("/login", login);

router.post("/register", register);

router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] }),
  loginGitHUb
);

router.get(
  "/github/callback/",
  passport.authenticate("github", { failureRedirect: "/login" }),
  gitHubCallback
);

export default router