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
      return undefined;
    }
    const isCodeRepeat = products.some((p) => p.code === product.code);
    if (isCodeRepeat) {
      return undefined;
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
    return "Producto agregado correctamente";
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
    const comprobacion=await this.getProductById(id)
    if (!comprobacion) {
      return ;
    }
    const {code}= props
    if(code){
      return ({response:"No se puede cambiar el codigo de un producto", code:400})
    }
    const products = await this.getProducts();
    const productIdex = products.findIndex((p) => p.id == id);
    products[productIdex] = { ...products[productIdex], ...props };
    await fs.promises.writeFile(
      this.path,
      JSON.stringify(products, null, "\t")
    );
    return ({response:"Producto actualizado correctamente", code:200})
  };

  deleteProduct = async (id) => {
    const products = await this.getProducts();
    const productsNew = products.filter((product) => product.id !== id);
    await fs.promises.writeFile(
      this.path,
      JSON.stringify(productsNew, null, "\t")
    );
    return
  };
}
