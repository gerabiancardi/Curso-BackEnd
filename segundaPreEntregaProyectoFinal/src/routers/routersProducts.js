import { Router } from "express";
import {managerproduct as manager} from "../dao/managerdb/ManagerProductsDb.js";


const router = Router();

router.get("/", async (req, res) => {
  try{
    const { limit, page, sort, ...query } = req.query;

    const queryLimit = limit ? Number(limit) : 10;

    const {
      docs: products,
      totalPages,
      prevPage,
      nextPage,
      page: productsPage,
      hasPrevPage,
      hasNextPage,
    } = await manager.getPaginateProducts({
      limit: queryLimit,
      page: page ? Number(page) : 1,
      sort: sort ? {price:sort}: undefined,
      query: query ? query : undefined,
    });
console.log(products,totalPages,prevPage,page)
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
        ? `http://localhost:8080/api/products?limit=${queryLimit}&page=${prevPage}`
        : null,
      nextLink: hasNextPage
        ? `http://localhost:8080/api/products?limit=${queryLimit}&page=${nextPage}`
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
  const product=req.body;
  if(Object.values(product).length !== 0){
    throw new Error ("Debe cargar todos los campos");
  }
  const response= await manager.addProduct(product);
  return res.status(201).json(response)
}catch (error) {
  console.log(error)
  res.send(error)
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