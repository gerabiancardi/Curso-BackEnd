import { Router } from "express";
import { addCart, deleteProductInCart, getCartById, getCarts, updateCart, addTicket } from "../controller/CartsController.js";
import authMdw from "../middleware/auth.middleware.js"
import { handlePolicies } from "../middleware/handpolicies.middleware.js";

const router = Router();

router.get("/",[authMdw, handlePolicies(["user"])], getCarts);

router.get("/:cid",[authMdw, handlePolicies(["USER"])], getCartById);

router.post("/",[authMdw, handlePolicies(["USER"])], addCart);

router.put("/:cid/products/:pid",[authMdw, handlePolicies(["USER"])], updateCart); 

router.delete("/:cid/products/:pid",[authMdw, handlePolicies(["USER"])], deleteProductInCart); 

router.get("/:cid/purchase",[authMdw, handlePolicies(["USER"])], addTicket);

export { router as cartsRouter };
