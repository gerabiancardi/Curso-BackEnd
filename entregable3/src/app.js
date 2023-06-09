import express from "express";
import {ProductManager} from "./manager/ManagerProducts.js";

const path = "./src/files/Products.json";

const manager = new ProductManager(path);

const app = express();

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
    return res.send("No existe el producto que estas buscando");
  }
  res.send({ result });
});

app.listen(8082, () => {
  console.log("listening on port 8082");
});
