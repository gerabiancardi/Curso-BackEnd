import { Router } from "express";
import { cambiarRol } from "../controller/SessionController.js";

const router = Router();

router.patch("/premium/:iud", cambiarRol);

export{ router as userRouter }