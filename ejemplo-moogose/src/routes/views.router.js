import { Router } from "express";

const router = Router();

router.get("/", async (req, res) => {
  res.render("index");
});

router.get("/realtimeproducts", (req, res) => {
  res.render("realTimeProducts");
});

export { router as viewsRouter };
