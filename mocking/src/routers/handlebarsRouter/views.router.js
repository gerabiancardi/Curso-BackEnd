import { Router } from "express";
import authMdw from "../../middleware/auth.middleware.js"
import { handlePolicies } from "../../middleware/handpolicies.middleware.js";
import { getCartById, getPaginateProducts, getProfile, login, register, renderProduct } from "../../controller/ViewsRouterContoler.js";
const router =Router();

router.get("/",[authMdw, handlePolicies(["USER"])],renderProduct)

router.get("/products",authMdw, getPaginateProducts);

router.get('/carts/:id',getCartById);

router.get("/login", login);

router.get("/register", register);

router.get("/profile", authMdw, getProfile);


export default router;