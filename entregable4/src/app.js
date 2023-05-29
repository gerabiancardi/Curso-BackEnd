import express from "express";
import {cartsRouter, productsRouter} from "./routers/index.js"
import { ProductManager } from "./manager/ManagerProducts.js";
import { Server as IOServer} from 'socket.io';
import handlebars from 'express-handlebars';
import viewsRouter from './routers/handlebarsRouter/views.router.js';
import __dirname from './utils.js';
import { Server as HttpServer } from "http";

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);
app.set("io", io);

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/api/products",productsRouter)
app.use("/api/carts",cartsRouter)

app.use(express.static(`public`));

app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');

app.use('/', viewsRouter);

const server = httpServer.listen(8080, () =>
  console.log(`Server running on port 8080`)
)

server.on("error", (error) => {
  console.log(error);
});

const path = "./src/files/Products.json";

const manager = new ProductManager(path);

io.on('connection', async (socket)=>{
console.log('Nuevo cliente conectado')

const products= await manager.getProducts();

/* io.sockets.emit("products", products) */ //sin esta linea me funciona igual
})
