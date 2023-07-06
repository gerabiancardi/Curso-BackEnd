import cartsModel from "../models/carts.models.js";
import productsModel from "../models/products.models.js";

export class CartManager {
  addCart = async (product) => {
    const newCart = await cartsModel.create(product);
    return newCart;
  };

  getCarts = async () => {
    const cartsArr = await cartsModel.find({});
    return cartsArr;
  };

  getCartById = async (id) => {
    const cartDetail = await cartsModel.findById(id).lean();
    return cartDetail;
  };

  updateCart = async (cid, productId) => {
    const cart = await cartsModel.findById(cid);
0
    if (!cart) {
      throw new Error("No existe el carrito");
    }

    const product = await productsModel.getProductById(productId);

    if (!product) {
      throw new Error("No existe el producto");
    }

    const existProductInCart = cart.productos.some((productCart) =>
      productCart.product.equals(productId)
    );

 
    if (!existProductInCart) {
      await cartsModel.updateOne(
        { _id: cid },
        {
          $push: {
            productos: { product: productId, quantity: 1 },
          },
        }
      );
   
      return this.getCartById(cid);
    }

    await cartsModel
      .updateOne(
        {
          _id: cid,
          "productos.product": productId,
        },
        { $inc: { "productos.$.quantity": 1 } }
      )
      .exec();

    return this.getProductById(cid);
  };
}
