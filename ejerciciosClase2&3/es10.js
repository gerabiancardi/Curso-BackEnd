//string.trim()

const cadena1 = `                        hola`;
const cadena2 = cadena1.trim();
console.log(cadena1.length);
console.log(cadena2);
console.log(cadena2.length);

//Flat: para generar un array plano cuando tenemos un anidamiento de arrays dentro de un array.

const arregloAnidado = ["1",2,3,4, [5,6,6], [8,9,10,11, [13,14,156]]];

console.log(arregloAnidado.flat(10));