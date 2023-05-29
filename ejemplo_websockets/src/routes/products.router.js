import { Router } from "express";
import { JOI_VALIDATOR } from "../utils/validator-utils.js";
import { productManager } from "../managers/productManager.js";

const productRouter = Router();

productRouter.get("/", async (req, res) => {
  try {
    const products = await productManager.getAll();
    return res.send({ products });
  } catch (error) {
    console.log(error);
    res.send("Ha ocurrido un error");
  }
});

productRouter.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productManager.getById(id);

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
    const product = await JOI_VALIDATOR.product.validateAsync(req.body);

    await productManager.save(product);

    req.app.get("io").sockets.emit("products", await productManager.getAll());

    res.send(product);
  } catch (error) {
    console.log(error);
    res.send(error.message);
  }
});

export { productRouter };
