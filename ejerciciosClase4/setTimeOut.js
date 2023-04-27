const temporizador = (callback) =>{
    setTimeout(() => {
        callback()
    }, 5000 );
}

const operacion = () => {
    console.log('Realizando la operación.');
} 


console.log('Inicio la tarea.');
temporizador(operacion);
console.log('Tarea finalizada.');