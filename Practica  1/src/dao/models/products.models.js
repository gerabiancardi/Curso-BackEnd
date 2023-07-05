import mongoose from 'mongoose';
import mongoosePaginate from "mongoose-paginate-v2";

const productsCollection = "Products";

const productsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  thumbnail: {
    type: String,
    required: false,
  },
  code: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  }
});


productsSchema.plugin(mongoosePaginate);

const productsModel = mongoose.model(productsCollection, productsSchema);
export default productsModel;