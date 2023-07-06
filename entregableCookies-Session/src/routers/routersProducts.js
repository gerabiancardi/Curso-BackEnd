import { Router } from "express";
import {ProductManager} from "../dao/managerdb/ManagerProductsDb.js";

const manager = new ProductManager();

const router = Router();

router.get("/", async (req, res) => {
  try{
    const { limit, page, sort, ...query } = req.query;

    const {
      docs: products,
      totalPages,
      prevPage,
      nextPage,
      page: productsPage,
      hasPrevPage,
      hasNextPage,
    } = await manager.getPaginateProducts({
      limit: limit ? Number(limit) : 10,
      page: page ? Number(page) : 1,
      sort: sort ? {price:sort}: undefined,
      query: query ? query : undefined,
    });

    const response = {
      payload: products,
      totalPages,
      prevPage,
      nextPage,
      page: productsPage,
      prevPage,
      hasPrevPage,
      hasNextPage,
      prevLink: hasPrevPage
        ? `http://localhost:8080/api/products?limit=${limit}&page=${prevPage}`
        : null,
      nextLink: hasNextPage
        ? `http://localhost:8080/api/products?limit=${limit}&page=${nextPage}`
        : null,
    };
    return res.send(response);
  } catch(error){
    console.log(error)
    res.send("Error")
  }
});


router.get("/:pid", async (req, res) => {
try{
  const pid = parseInt(req.params.pid);
  const result = await manager.getProductById(pid);
  if (!result) {
    return res.status(404).json({ error: "Producto no encontrado" });
    ;
  }
  res.send({ result });
}catch{
  res.send("Ha ocurrido un error")
}});

 router.post("/",async(req,res)=>{
try{
  const product=(req.body)
  const response= await manager.addProduct(product);
  if(response){
    return res.status(201).json(response)
  }
  res.status(404).json({ error: "Debe cargar todos los campos o cargo un producto con el codigo repetido" });
}catch{
  res.send("Ha ocurrido un error")
}})

router.put("/:pid",async(req,res)=>{
try{
  const pid=parseInt(req.params.pid)
  const props=(req.body)
  const response=await manager.updateProduct(pid,props)
  if(response){
    res.status(response.code).json({mensaje:response.response})
  }
  res.status(404).json({ error: "Producto no encontrado" });
}catch{
  res.send("Ha ocurrido un error")
}})

router.delete("/:pid",async(req,res)=>{
try{  
  const pid = parseInt(req.params.pid);
  const response=await manager.deleteProduct(pid);
  console.log(response)
  if(response){
    return res.sendStatus(204);
  }
  res.status(404).json({ error: "Producto no encontrado" })
}catch{
  res.send("Ha ocurrido un error")
}}) 



export {router as productsRouter}