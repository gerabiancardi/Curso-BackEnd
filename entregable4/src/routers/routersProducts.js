import { Router } from "express";
import {ProductManager} from "../manager/ManagerProducts.js";

const path = "./src/files/Products.json";

const manager = new ProductManager(path);

const router = Router();

router.get("/", async (req, res) => {
  const result = await manager.getProducts();
  if (!result) {
    return res.status(404).json({ error: "Productos no encontrados" });
    ;
  }
  res.send({ result });
});

router.get("/:pid", async (req, res) => {
  const pid = parseInt(req.params.pid);
  const result = await manager.getProductById(pid);
  if (!result) {
    return res.status(404).json({ error: "Producto no encontrado" });
    ;
  }
  res.send({ result });
});

router.post("/",async(req,res)=>{
  const product=(req.body)
  const response= await manager.addProduct(product);
  if(response){
    req.app.get("io").sockets.emit("products", await manager.getProducts());
    return res.status(201).json(response)
  }
  res.status(404).json({ error: "Debe cargar todos los campos o cargo un producto con el codigo repetido" });
})

router.put("/:pid",async(req,res)=>{
  const pid=parseInt(req.params.pid)
  const props=(req.body)
  const response=await manager.updateProduct(pid,props)
  if(response){
    res.status(response.code).json({mensaje:response.response})
  }
  res.status(404).json({ error: "Producto no encontrado" });
})

router.delete("/:pid",async(req,res)=>{
  const pid = parseInt(req.params.pid);
  const response=await manager.deleteProduct(pid);
  console.log(response)
  if(response){
    return res.sendStatus(204);
  }
  res.status(404).json({ error: "Producto no encontrado" })
})

export {router as productsRouter}