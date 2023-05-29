import fs from "fs";

class ProductManager {
  constructor(path) {
    this.path = path;
  }

  #writeFile(data) {
    return fs.promises.writeFile(this.path, JSON.stringify(data, null, 3));
  }

  async getAll() {
    try {
      const data = await fs.promises.readFile(this.path);
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }

  async getById(id) {
    const products = await this.getAll();
    const product = products.find((p) => p.id === id);
    return product;
  }

  async save({ title, description, price, code }) {
    const products = await this.getAll();

    const existCodeInProducts = products.some(
      (product) => product.code === code
    );

    if (existCodeInProducts) throw new Error("Code should be different");
    const newProduct = {
      id: !products.length ? 1 : products[products.length - 1].id + 1,
      title,
      description,
      price,
      code,
    };

    products.push(newProduct);

    await this.#writeFile(products);

    return newProduct;
  }
}

export const productManager = new ProductManager("./src/db/products.json");
