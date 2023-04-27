import ProductManager from "./managers/ManagerProducts.js";
const path = "./files/Products.json";

const manager = new ProductManager(path);

const env = async () => {
  let product = {
    title: "Foco",
    description: "Foco 9KW",
    price: 12,
    thumbnail: "2ssdsadasd",
    code: "1221AD",
    stock: 13,
  };
  let product2 = {
    title: "Foco",
    description: "Foco 9KW",
    price: 12,
    thumbnail: "2ssdsadasd",
    code: "1AD",
    stock: 13,
  };

  console.log("------------------------------------");
  await manager.addProduct(product);

  await manager.addProduct(product2);

  let result = await manager.getProducts();

  console.log(result);
  console.log("------------------------------------");

  let ID = await manager.getProductById(2);
  console.log(ID);
  console.log("------------------------------------");
  await manager.deleteProduct(2);
  let resultelimnado = await manager.getProducts();
  console.log(resultelimnado);
  console.log("------------------------------------");

  await manager.updateProduct(1, { title: "remera" });
  let resultmodificado = await manager.getProducts();
  console.log(resultmodificado);
};

env();
