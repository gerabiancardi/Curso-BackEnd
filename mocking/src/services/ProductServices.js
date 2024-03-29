import { productDao } from "../dao/ProductDao.js";

class ProductService {
  addProduct = async (product) => {
    const productDetail = await productDao.getProductByCode(product.code);

    if (productDetail) {
      throw new Error("Code should be different")
    }
    const newProduct = await productDao.addProduct(product);
    return newProduct;
  };

  getProducts = async () => {
    return await productDao.getProducts();
  };

  getPaginateProducts = async ({ limit, page, sort, query }) => {
    return await productDao.getPaginateProducts({ limit, page, sort, query });
  };

  getProductById = async (id) => {
   return await productDao.getProductById(id);
  };

  updateProduct = async (id, props) => {
    const productDetail = await productDao.getProductByCode(props.code);
    if (productDetail && Object.keys(productDetail).length !== 0) {
      throw new Error("Code should be different");
    }
    await productDao.updateProduct(id, props);
    return { response: "Producto actualizado correctamente", code: 200 };
  };

  deleteProduct = async (id) => {
    await productDao.deleteProduct(id);
    return { response: "Producto eliminado correctamente", code: 200 };
  };
}

export const Serviceproduct = new ProductService();