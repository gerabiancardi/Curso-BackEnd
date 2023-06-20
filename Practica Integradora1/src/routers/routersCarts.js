import { Router } from "express";
import { CartManager } from "../dao/managerdb/ManagerCartsDb.js";

const manager = new CartManager();

const router = Router();

router.get("/", async (req, res) => {
  const response= await manager.getCarts()
  if(response){
   return res.send(response)
  }res.status(404).json({ error: "Carrito no encontrado" });
});

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

/* router.put("/:cid/products/:pid", async (req, res) => {
const cid=(req.params.cid)
const pid=(req.params.pid)
const quantity=(req.body)
const response= await manager.updateCart(cid,pid,quantity)
res.json(response)
}); */ 

export { router as cartsRouter };
