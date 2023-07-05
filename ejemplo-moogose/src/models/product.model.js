import { Schema, model } from "mongoose";

const collectionName = "products";

const ProductSchema = new Schema({
  title: { type: String, required: true},
  description: { type: String, required: true},
  thumbnail:{ type: String, required: true},
  code: { type: String, required: true},
  price: { type: Number, required: true},
  stock: { type: Number, required: true},
});

export const ProductModel = model(collectionName, ProductSchema);
