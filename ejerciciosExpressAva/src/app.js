import express from "express";
import {ProductManager} from "./manager/ManagerProducts.js";

const path = "./src/files/Products.json";

const manager = new ProductManager(path);

const app = express();

app.use(express,json())
app.use(express.urlencoded({extended:true }))

app.get("/products", async (req, res) => {
  const result = await manager.getProducts();

  const limit = parseInt(req.query.limit);
  if (limit) {
    const resultlimited = result.slice(0, limit);
    res.send({ result: resultlimited });
  } else {
    res.send({ result });
  }
});

app.get("/products/:pid", async (req, res) => {
  const pid = parseInt(req.params.pid);
  console.log(req.params);
  const result = await manager.getProductById(pid); 
  if (!result) {
    return "No existe el producto que estas buscando";
  }
  res.send({ result });
});

app.post("/products", async(req,res)=>{
  const {title,description,price,thumbnail,code,stock}= req.body;
  const product = {title,description,price,thumbnail,code,stock};
  await manager.addProduct(product);
  res.status(201).json(product);
})

app.listen(8083, () => {
  console.log("listening on port 8083");
});
