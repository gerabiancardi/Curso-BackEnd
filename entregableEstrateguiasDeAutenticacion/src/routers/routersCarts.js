import { Router } from "express";
import { managerCart as manager } from "../dao/managerdb/ManagerCartsDb.js";

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
}catch (error){
  console.log(error)
  res.send(error)
}}); 

router.delete("/:cid/products/:pid", async (req, res) => {
  try{
    const cid=(req.params.cid)
    const productoId=(req.params.pid)
    const response= await manager.DeleteProductInCart(cid,productoId)
    res.json(response)
  }catch (error){
    console.log(error)
    res.send(error)
  }}); 


export { router as cartsRouter };
