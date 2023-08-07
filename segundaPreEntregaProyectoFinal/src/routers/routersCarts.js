import { Router } from "express";
import { addCart, deleteProductInCart, getCartById, getCarts, updateCart } from "../controller/CartsController.js";

const router = Router();

router.get("/", getCarts);

router.get("/:cid", getCartById);

router.post("/", addCart);

router.put("/:cid/products/:pid", updateCart); 

router.delete("/:cid/products/:pid", deleteProductInCart); 


export { router as cartsRouter };
