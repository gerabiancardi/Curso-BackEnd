import cartsModel from "./models/carts.models.js";


class CartDao {
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

  updateCartWhenProductIsNotInCart = async (cid, productId) => {
    return await cartsModel.updateOne(
      { _id: cid },
      {
        $push: {
          productos: { id: productId, quantity: 1 },
        },
      }
    );
  };

  updateCartWhenProductIsInCart = async (cid, productId) => {
    return await cartsModel
      .updateOne(
        {
          _id: cid,
          "productos.id": productId,
        },
        { $inc: { "productos.$.quantity": 1 } }
      )
      .exec();
  };

  DeleteProductInCart = async (cid, productId) => {
    return await cartsModel
      .updateOne(
        {
          _id: cid,
          "productos.id": productId,
        },
        { $pull: { productos: { id: productId } } }
      )
      .exec();
  };
}

export const cartDao = new CartDao();
