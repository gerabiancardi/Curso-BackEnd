import { Router } from "express";
import { CartManager } from "../manager/ManagerCarts.js";

const path = "./src/files/Carts.json";

const manager = new CartManager(path);

const router = Router();

router.get("/:cid", async (req, res) => {
  const cid=(req.params.cid)
  const response= await manager.getCartById(cid)
  if(response){
   return res.send(response)
  }res.status(404).json({ error: "Carrito no encontrado" });
});

router.post("/", async (req, res) => {
  const products = req.body;
  const response = await manager.addCart(products);
  res.status(201).json(response)
});

router.post("/:cid/products/:pid", async (req, res) => {
const cid=(req.params.cid)
const pid=(req.params.pid)
const response= await manager.updateCart(cid,pid)
res.json(response)
});


export { router as cartsRouter };
