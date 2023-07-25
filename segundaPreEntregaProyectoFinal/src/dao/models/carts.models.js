import mongoose from 'mongoose';

const CartsCollection = "Carts";

const ProductsCartsSchema = new mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Products"
  },
  quantity:{
    type: Number,
    required: true,
  }
})

const CartsSchema = new mongoose.Schema({
 productos: [ProductsCartsSchema]
});

const CartsModel = mongoose.model(CartsCollection, CartsSchema);
export default CartsModel;