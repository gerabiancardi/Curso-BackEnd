import { Router } from "express";
import {addProduct, deleteProduct, getPaginateProducts, getProductById, updateProduct} from "../controller/ProductsController.js"

const router = Router();

router.get("/", getPaginateProducts);

router.get("/:pid", getProductById);

 router.post("/",addProduct)

router.put("/:pid",updateProduct)

router.delete("/:pid",deleteProduct) 


export {router as productsRouter}