import fs from "fs";

export class ProductManager {
  constructor(path) {
    this.path = path;
  }

  addProduct = async (product) => {
    const products = await this.getProducts();

    if (
      !product.title ||
      !product.description ||
      !product.price ||
      !product.thumbnail ||
      !product.code ||
      !product.stock
    ) {
      console.log(
        "Todos los campos son de carga obligatoria, intente nuevamente"
      );
      return;
    }
    const isCodeRepeat = products.some((p) => p.code === product.code);
    if (isCodeRepeat) {
      console.log("el codigo de producto ya existe, intente con otro");
      return;
    }

    if (products.length === 0) {
      product.id = 1;
    } else {
      product.id = products[products.length - 1].id + 1;
    }
    products.push(product);
    await fs.promises.writeFile(
      this.path,
      JSON.stringify(products, null, "\t")
    );
    return products;
  };

  getProducts = async () => {
    if (fs.existsSync(this.path)) {
      const data = await fs.promises.readFile(this.path, "utf-8");
      const products = JSON.parse(data);
      return products;
    } else {
      return [];
    }
  };

  getProductById = async (id) => {
    const products = await this.getProducts();
    const product = products.find((element) => {
      return element.id === id;
    });
    return product;
  };

  updateProduct = async (id, props) => {
    if (!this.getProductById(id)) {
      return -1;
    }
    const products = await this.getProducts();
    const productIdex = products.findIndex((p) => p.id == id);
    products[productIdex] = { ...products[productIdex], ...props };
    await fs.promises.writeFile(
      this.path,
      JSON.stringify(products, null, "\t")
    );
  };

  deleteProduct = async (id) => {
    const products = await this.getProducts();
    const productsNew = products.filter((product) => product.id !== id);
    await fs.promises.writeFile(
      this.path,
      JSON.stringify(productsNew, null, "\t")
    );
  };
}
