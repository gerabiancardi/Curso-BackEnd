import { Router } from "express";
import passport from "passport";
import {
  gitHubCallback,
  login,
  register,
  logout,
} from "../controller/SessionController.js";
import { handlePolicies } from "../middleware/handpolicies.middleware.js";

const router = Router();

router.get("/logout", logout);

router.post("/login", login);

router.post("/register", register);

router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

router.get(
  "/github/callback/",
  passport.authenticate("github", { failureRedirect: "/login" }),
  gitHubCallback
);

router.get("/current", handlePolicies(["user"]), (req, res) => {
  const {pasword,...user} = req.session.user
  res.send(user);
});

export default router;
