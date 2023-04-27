//nullish

const prueba = undefined;

const variableAsignada = prueba && "Sin valor" ;

const nullish = prueba ?? "Sin valor" ;

console.log(variableAsignada);
console.log(nullish);