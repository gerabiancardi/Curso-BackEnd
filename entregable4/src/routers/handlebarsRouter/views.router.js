import {Router} from 'express';
import { ProductManager } from '../../manager/ManagerProducts.js';

const router = Router();
const path = "./src/files/Products.json";

const manager = new ProductManager(path);
const products= await manager.getProducts()

router.get('/', (req, res)=>{
    res.render('home', {products})
});

router.get('/realTimeProducts', (req, res)=>{
    res.render('realTimeProducts')
});

export default router;