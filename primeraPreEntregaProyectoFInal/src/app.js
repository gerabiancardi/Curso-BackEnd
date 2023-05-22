import express from "express";
import {cartsRouter} from "./routers/routersCarts.js"
import {productsRouter} from "./routers/routersProducts.js"

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/api/products",productsRouter)
app.use("/api/carts",cartsRouter)


app.listen(8080, () => {
  console.log("listening on port 8080");
});
