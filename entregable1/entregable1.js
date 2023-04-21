class ProductManager {
  constructor() {
    this.products = [];
  }

  addProduct = (tittle, description, price, thumbnial, code, stock) => {
    if (!tittle || !description || !price || !thumbnial || !code || !stock) {
      console.log("Todos los campos son de carga obligatoria, intente nuevamente");
      return;
    }
    const isCodeRepiate = this.products.some(
      (product) => product.code === code
    );
    if (isCodeRepiate) {
      console.log("el codigo de producto ya existe, intente con otro");
      return;
    }

    let id = 0;
    if (this.products.length === 0) {
      id = 1;
    } else {
      id = this.products.slice(-1)[0].id + 1;
    }
    this.products.push({
      tittle,
      description,
      price,
      thumbnial,
      code,
      stock,
      id,
    });
  };
  getProducts = () => {
    return this.products;
  };
  getProductById = (id) => {
    const result = this.products.find((element) => {
      return element.id === id;
    });
    if (!result) {
      return "No existe el producto que esta buscando";
    }
    return result;
  };
}


const productManager = new ProductManager();
productManager.addProduct("gera", "dfgdfg", 123, 2312, 312, 1231);
productManager.addProduct("gera", "dfgdfg", 123, 2312, 312, 1231);
productManager.addProduct("gera", "dfgdfg", 1233, 23312, 3123, 12312);
productManager.addProduct("gera", "dfgdfg", 1233, 233132, 31223, 123123);
productManager.addProduct("dfgdfg", 1233, 233132, 31223, 123123);

console.log("respuesta a getproducts", productManager.getProducts());
console.log("respuesta a getproductbyId1", productManager.getProductById(1));
console.log("respuesta a getproductbyId2", productManager.getProductById(2));
