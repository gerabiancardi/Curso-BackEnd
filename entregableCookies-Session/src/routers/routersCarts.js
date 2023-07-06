import { Router } from "express";
import { CartManager } from "../dao/managerdb/ManagerCartsDb.js";

const manager = new CartManager();

const router = Router();

router.get("/", async (req, res) => {
try{
  const response= await manager.getCarts()
  if(response){
   return res.send(response)
  }res.status(404).json({ error: "Carrito no encontrado" });
}catch{
  res.send("Error")
}});

router.get("/:cid", async (req, res) => {
try{
  const cid=(req.params.cid)
  const response= await manager.getCartById(cid)
  if(response){
   return res.send(response)
  }res.status(404).json({ error: "Carrito no encontrado" });
}catch{
  res.send("Error")
}});

router.post("/", async (req, res) => {
try{
  const products = req.body;
  const response = await manager.addCart(products);
  res.status(201).json(response)
}catch{
  res.send("Error")
}});

router.put("/:cid/products/:pid", async (req, res) => {
try{
  const cid=(req.params.cid)
  const productoId=(req.params.pid)
  const response= await manager.updateCart(cid,productoId)
  res.json(response)
}catch{
  res.send("Error")
}}); 

export { router as cartsRouter };
