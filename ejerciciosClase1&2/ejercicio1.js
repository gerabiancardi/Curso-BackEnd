function mostraLista(arreglo) {
  if (arreglo.length === 0) {
    console.log(`Lista Vacia`);
    return;
  }
  for (i = 0; i < arreglo.length; i++) {
    console.log(arreglo[i]);
  }
  console.log(`Longitud de la lista es ${arreglo.length}`);
}

mostraLista([]);
