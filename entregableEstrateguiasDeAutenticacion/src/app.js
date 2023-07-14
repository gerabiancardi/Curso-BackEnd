import express from "express";
import {cartsRouter, productsRouter} from "./routers/index.js"
import { Server } from 'socket.io';
import handlebars from 'express-handlebars';
import viewsRouter from './routers/handlebarsRouter/views.router.js';
import __dirname from './utils.js';
import  mongoDBConnection  from "./db/mongo.config.js";
import  {managermessage}  from "./dao/managerdb/ManagerMessagesDb.js";
import  {managerproduct} from "./dao/managerdb/ManagerProductsDb.js";
import sessionRoutes from "./routers/sessionroutes.js";
import session from 'express-session';
import cookieParser from 'cookie-parser'
import {DB_NAME, DB_URL} from "./config/config.js";
import mongoStore from 'connect-mongo';
import initializePassport from "./config/passport.js";
import passport from "passport";

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/api/products",productsRouter)
app.use("/api/carts",cartsRouter)

app.use(express.static(`${__dirname}/public`));

app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');

app.use(cookieParser());
app.use(
  session({
    store: mongoStore.create({
      mongoUrl:`${DB_URL}${DB_NAME}`,
      mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
      ttl: 60,
      // ttl: 60 * 3600
    }),
    secret: "secretS3ss10n",
    resave: false,
    saveUninitialized: false,
  })
);

app.use('/', viewsRouter);
app.use("/api/session", sessionRoutes);

initializePassport();
app.use(passport.initialize())

const server = app.listen(8080, ()=>console.log("Server runing"));

server.on("error", (error) => {
  console.log(error);
});

const io = new Server (server);

const messages =[];

io.on("connection", async socket=>{
console.log("Nuevo Cliente conectado");

const {
  docs: products,
  totalPages,
  prevPage,
  nextPage,
  page: productsPage,
  hasPrevPage,
  hasNextPage,
} = await managerproduct.getPaginateProducts({
  limit: 10,
  page: 1,
});

console.log(prevPage,nextPage)


const response = {
  payload: products,
  totalPages,
  prevPage,
  nextPage,
  page: productsPage,
  prevPage,
  hasPrevPage,
  hasNextPage,
  prevLink: hasPrevPage
    ? `http://localhost:8080/products?limit=10&page=${prevPage}`
    : null,
  nextLink: hasNextPage
    ? `http://localhost:8080/products?limit=10&page=${nextPage}`
    : null,
};

io.sockets.emit("products", response);

socket.on("message", async data=>{
    messages.push(data);
    const mensajeNuevo= await managermessage.addMessage(data)
    io.emit("messageLogs", messages);
});

socket.on("authenticated", data=>{
    socket.emit("messageLogs", messages);
    socket.broadcast.emit("NewUserConnected", data);
});

});




await mongoDBConnection()