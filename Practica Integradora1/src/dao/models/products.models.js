import mongoose from 'mongoose';

const productsCollection = "Products";

const productsSchema = new mongoose.Schema({
  Title: {
    type: String,
    required: true,
  },
  Description: {
    type: String,
    required: true,
  },
  Price: {
    type: Number,
    required: true,
  },
  Thumbnail: {
    type: String,
    required: false,
  },
  Code: {
    type: Number,
    required: true,
  },
  Stock: {
    type: Number,
    required: true,
  }
});

const productsModel = mongoose.model(productsCollection, productsSchema);
export default productsModel;