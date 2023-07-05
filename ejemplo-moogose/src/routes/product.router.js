import { Router } from "express";
import {productMongoManager } from "../Dao/index.js";

const productRouter = Router();

productRouter.get("/", async (req, res) => {
  try {
    const products = await productMongoManager.getAll();
    return res.send({ products });
  } catch (error) {
    console.log(error);
    res.send("Ha ocurrido un error");
  }
});

productRouter.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productMongoManager.getById(id);
    if (!product) {
      return res.send({
        success: true,
        message: "No se ha encontrado el producto",
      });
    }

    return res.send({
      success: true,
      data: products,
    });
  } catch (error) {
    console.log(error);
    res.send("Ha ocurrido un error");
  }
});

productRouter.post("/", async (req, res) => {
  try {
    const { title, description, price, code } = req.body;

    const product = await JOI_VALIDATOR.product.validateAsync({
      title,
      description,
      price,
      code,
    });

    const createdProduct = await productMongoManager.save(product);
    req.app
      .get("io")
      .sockets.emit("products", await productMongoManager.getAll());
    res.send(createdProduct);
  } catch (error) {
    console.log(error);
    res.send(error.message);
  }
});

export { productRouter };
