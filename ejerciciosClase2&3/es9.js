//Spread y rest

const objeto1 = {
    propiedad1: 2,
    propiedad2: "b",
    propiedad3: true
};

const objeto2 = {
    propiedad4: "c",
    propiedad5: [1,2,3,4]
};

const objetoResultante = {
    ...objeto1, ...objeto2
};
console.log(objetoResultante);

//Rest: va a excluir algún elemento del objeto. 

const objeto3 = {
    a: 1,
    b:2,
    c:3
};
const {a, b, ...rest} = objeto3;
console.log(rest);
console.log(objeto3);

//Resolución ejercicio es9
const objetos =  [
	{
		manzanas:3,
		peras:2,
		carne:1,
		jugos:5,
		dulces:2
	},
	{
		manzanas:1,
		sandias:1,
		huevos:6,
		jugos:1,
		panes:4
	}
]

let newArray = [];
let total = 0;

objetos.forEach(objeto => {
	const keys = Object.keys(objeto);
	const values = Object.values(objeto);

	total += values.reduce((valorInicial, valorAcumulado) => valorAcumulado + valorInicial);

	keys.forEach(key => {
		if (!newArray.includes(key)) newArray.push(key);
	})
})

console.log(newArray);
console.log(total);
