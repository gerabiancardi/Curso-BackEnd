//Scope: es el alancance que va a tener la variable dentro del codigo global o local

const variableGobal="test";
function prueba (){
    const variable =1;
    console.log(variable)
    console.log(variableGobal);
    if(true){
        const variable2= 2;
        console.log(variable2);
        console.log(variable)
    }
}

prueba();
console.log(variableGobal);

// template string:

const cadena1="Hola";
const cadena2="Como va";

console.log(cadena1 + " Chicos " + cadena2);

// alt +  96 es para las ``

console.log(`${cadena1} ${cadena2}`);
