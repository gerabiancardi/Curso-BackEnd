
const dividir = (dividendo, divisor) =>{
    return new Promise ((resolve,reject) =>{

    if (divisor === 0){
        reject ("No se puede hacer divisiones entre cero");
    } else{
        resolve(dividendo/divisor)
    }
});

};
dividir(6,0)
    .then(resultado =>{
        console.log(resultado);
    }) .catch(error => {
        console.log(error)
    })

    