import express from "express";

const app = express();

app.get('/bienvenida', (req, res) => {
  res.send(
    `<h1 style="color:blue;"> Bienvenido a mi primer servidor express </h1>`
  );
});

app.get('/usuario', (req, res) => {
  res.send({
    nombre: "Efren",
    apellido: "Garcia",
    edad: 20,
    correo: "eagp80@gmail.com",
  });
});

app.listen(8081, () => {
  console.log("listening on port 8081");
});


