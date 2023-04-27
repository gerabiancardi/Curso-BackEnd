class ProductManager {
  constructor() {
    this.products = [];
  }

  addProduct = ({title, description, price, thumbnail, code, stock}) => {
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      console.log("Todos los campos son de carga obligatoria, intente nuevamente");
      return;
    }
    const isCodeRepeat = this.products.some(
      (product) => product.code === code
    );
    if (isCodeRepeat) {
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
      title,
      description,
      price,
      thumbnail,
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
productManager.addProduct({title:"gera", description:"dfgdfg", price:123,thumbnail: 2312,code: 312,stock: 1231});
productManager.addProduct({title:"ge", description:"dffg", price:133,thumbnail: 2332,code: 315,stock: 1233});
productManager.addProduct({title:"ga", description:"fgdfg", price:12,thumbnail: 212,code: 32,stock: 11});
productManager.addProduct({title:"ra", description:"dffg", price:23,thumbnail: 312,code: 32,stock: 121});
productManager.addProduct({title:"gar", description:"dfg", price:3,thumbnail: 22,code: 2,stock: 31});

console.log("respuesta a getproducts", productManager.getProducts());
console.log("respuesta a getproductbyId1", productManager.getProductById(1));
console.log("respuesta a getproductbyId2", productManager.getProductById(2));
