import express from "express";
import {cartsRouter, productsRouter} from "./routers/index.js"
import { Server } from 'socket.io';
import handlebars from 'express-handlebars';
import viewsRouter from './routers/handlebarsRouter/views.router.js';
import __dirname from './utils.js';
import  mongoDBConnection  from "./db/mongo.config.js";
import { MessageManager } from "./dao/managerdb/ManagerMessagesDb.js";

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

const server = app.listen(8080, ()=>console.log("Server runing"));

server.on("error", (error) => {
  console.log(error);
});

const io = new Server (server);

const messages =[];

const manager =new MessageManager();

io.on("connection", socket=>{
    console.log("Nuevo Cliente conectado");

socket.on("message", async data=>{
    messages.push(data);
    const mensajeNuevo= await manager.addMessage(data)
    io.emit("messageLogs", messages);
});

socket.on("authenticated", data=>{
    socket.emit("messageLogs", messages);
    socket.broadcast.emit("NewUserConnected", data);
});

});

await mongoDBConnection()