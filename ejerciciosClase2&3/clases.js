class Persona {
  constructor(nombre) {
    this.nombre = nombre;
  }

  static especie = "humano";

  saludar = () => {
    console.log(`Hola, soy ${this.nombre}`);
  };

  obtenerEspecie = () => {
    console.log(`La especie es ${Persona.especie}`);
  };
}


const persona1 = new Persona("Andrea");
const persona2 = new Persona("Gerardo");

persona1.saludar();
persona2.obtenerEspecie();