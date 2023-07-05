import { ProductModel } from "../models/index.js";

class ProductMongoManager {
  constructor() {
    this.productModel = ProductModel;
  }

  async getAll() {
    const data = await this.productModel.find().lean();
    return data;
  }

  async getById(id) {
    const product = await this.productModel.findById(id).lean();
    return product;
  }

  async save({ title, description, price, code, stock, thumbnail }) {
    const existCodeInProducts = await this.productModel.findOne({ code: code });

    if (existCodeInProducts) {
      throw new Error("Code should be different");
    }

    const product = {
      title,
      description,
      price,
      code,
      stock, 
      thumbnail
    };

    const createdProduct = await this.productModel.create(product);

    return createdProduct;
  }
}

export const productMongoManager = new ProductMongoManager();
