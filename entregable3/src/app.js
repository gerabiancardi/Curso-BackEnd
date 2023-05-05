import express from "express";
import ProductManager from "./manager/ManagerProducts.js";

const path = "./files/Products.json";

const manager = new ProductManager(path);

const app = express();

app.get("/products", async (req, res) => {
  let result = await manager.getProducts();

  let limit = parseInt(req.query.limit);
  if (limit) {
    let resultlimited = result.slice(0, limit);
    res.send({ result: resultlimited });
  } else {
    res.send({ result });
  }
});

app.get("/products/:pid", async (req, res) => {
  let pid = parseInt(req.params.pid);
  console.log(req.params);
  let result = await manager.getProductById(pid);
  res.send({ result });
});

app.listen(8082, () => {
  console.log("listening on port 8082");
});

