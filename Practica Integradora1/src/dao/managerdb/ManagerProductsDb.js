import productsModel from "../models/products.models.js";

export class ProductManager {

  addProduct = async (product) => {
    try {
      const productDetail = await productsModel.findOne({
        Code: product.Code,
      });
      if (productDetail && Object.keys(productDetail).length !== 0) {
        return null
        ;
      }

      const newProduct = await productsModel.create(product);
      return newProduct;
    } catch (error) {
      console.log(
        "error al crear producto",
        error
      );
    }
  };
  

  getProducts = async () => {
    try {
      const productsArr = await productsModel.find({});
      return productsArr;
    } catch (error) {
      console.log(
        "No se encontraron productos",
        error
      );
    }
  };

  getProductById = async (id) => {
    try {
      const productDetail = await productsModel.findById({ _id: id });
      return productDetail;
    } catch (error) {
      console.log(
        "no se encontro producto",
        error
      );
    }
  };
/* 
  updateProduct = async (id, props) => {
    const productoeliminado= await productsModel.findOneAndUpdate({_id:id}, {props})
    return ({response:"Producto actualizado correctamente", code:200})
  };

  deleteProduct = async (id) => {
   try {
    const productoeliminado= await productsModel.findOneAndDelete({_id:id})
    return ({response:"Producto eliminado correctamente", code:200})
   } catch (error) {
    console.log(error)
   }
  }; */
};