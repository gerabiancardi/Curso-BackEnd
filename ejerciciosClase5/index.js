const moment = require("moment")

const fechaActual = moment();
const fechaNacimiento=moment("1995-05-11");

if(fechaNacimiento.isValid()){
 console.log(fechaActual.diff(fechaNacimiento,"days"))   
}

console.log(fechaActual);