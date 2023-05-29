import express from "express";
import handlebars from "express-handlebars";
import { productManager } from "./managers/productManager.js";
import { productRouter, viewsRouter } from "./routes/index.js";

// SOCKET
import { Server as HttpServer } from "http";
import { Server as IOServer } from "socket.io";

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

// Aprovechando el método set de express, podemos establecer globalmente valores que son accesibles por los routers mediante el objeto request (req)
// Documentacion: https://www.geeksforgeeks.org/express-js-app-set-function/
// Acá seteamos con la clave "io", la instancia creada por socket.io
// Si van a products.router.js, en el metodo post, van a ver como se está usando
app.set("io", io);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

app.use("/imagenes", express.static("assets"));
app.use(express.static("public"));

app.use("/", viewsRouter);
app.use("/api/products", productRouter);

const PORT = 8080;
// app.listen(PORT);
const server = httpServer.listen(PORT, () =>
  console.log(`Server running on port ${server.address().port}`)
);
 
server.on("error", (error) => {
  console.log(error);
});

io.on("connection", async (socket) => {
  console.log(`New client connected, id: ${socket.id}`);

  const products = await productManager.getAll();

  io.sockets.emit("products", products);
});
