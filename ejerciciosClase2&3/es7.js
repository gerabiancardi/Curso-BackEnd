//Exponencial
const valoresBase = [1,2,3,4,5,6];

//Operador Map
const nuevosValores = valoresBase.map((numero,indice)=> numero**indice);

console.log(nuevosValores);

//Includes:
const nombres = ["Luciana", "Maria", "Tomás", "Julio"];

if (nombres.includes ("Martina")){
    console.log("Tenemos el elemento");
} else {
    console.log ("No hay elementos en el array");
}