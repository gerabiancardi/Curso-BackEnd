import express from "express";
const app = express();

const personas = [
  {
    id: 1,
    nombre: "pepe",
    edad: 25,
  },
  {
    id: 2,
    nombre: "daniel",
    edad: 50,
  },
];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/personas", (req, res) => {
  res.send(personas);
});

app.get("/personas/:id", (req, res) => {
  const { id } = req.params;
  const persona = personas.find((persona) => persona.id == id);
  if (persona) return res.json(persona);
  res.status(404).json({ error: "Persona no encontrada" });
});

app.get("/search", (req, res) => {
  const { nombre } = req.query;
  const persona = personas.find((persona) => persona.nombre == nombre);
  if (persona) return res.send(persona);
  res.sendStatus(404);
});

app.post("/personas", (req, res) => {
  const { nombre, edad } = req.body;
  const id = personas.length + 1;
  const persona = { id, nombre, edad };
  personas.push(persona);
  res.status(201).json(persona);
});

app.put("/personas/:id", (req, res) => {
  const { id } = req.params;
  const { nombre, edad } = req.body;
  const persona = personas.find((persona) => persona.id == id);
  if (persona) {
    persona.nombre = nombre;
    persona.edad = edad;
    return res.json(persona);
  }
  res.status(404).json({ error: "Persona no encontrada" });
});

app.delete("/personas/:id", (req, res) => {
  const { id } = req.params;
  const persona = personas.find((persona) => persona.id == id);
  if (persona) {
    personas.splice(personas.indexOf(persona), 1);
    return res.sendStatus(204);
  }
  res.status(404).json({ error: "Persona no encontrada" });
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});