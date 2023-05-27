import express from "express";
import {cartsRouter, productsRouter} from "./routers/index.js"
import { Server} from 'socket.io';
import handlebars from 'express-handlebars';
import viewsRouter from './routers/handlebarsRouter/views.router.js';
import __dirname from './utils.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/api/products",productsRouter)
app.use("/api/carts",cartsRouter)

app.use(express.static(`${__dirname}/public`));

app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');

app.use('/', viewsRouter);

const server=app.listen(8080, () => {
  console.log("listening on port 8080");
});

const io=new Server(server);

io.on('connection', socket=>{
console.log('Nuevo cliente conectado')})