import { cartDao } from "../dao/CartDao.js";
import { productDao } from "../dao/ProductDao.js";

class CartSerivce {
  addCart = async (product) => {
    const newCart = await cartDao.addCart(product);
    return newCart;
  };

  getCarts = async () => {
    const cartsArr = await cartDao.getCarts();
    return cartsArr;
  };

  getCartById = async (id) => {
    const cartDetail = await cartDao.getCartById(id);
    return cartDetail;
  };

  updateCart = async (cid, productId) => {
    const cart = await cartDao.getCartById(cid);

    if (!cart) {
      throw new Error("No existe el carrito");
    }

    const product = await productDao.getProductById(productId);

    if (!product) {
      throw new Error("No existe el producto");
    }

    const existProductInCart = cart.productos.some((productCart) => {
      return productCart.id?.toString() === product.id;
    });

    if (!existProductInCart) {
      await cartDao.updateCartWhenProductIsNotInCart(cid, productId);
      return this.getCartById(cid);
    }
    await cartDao.updateCartWhenProductIsInCart(cid, productId);
    return this.getCartById(cid);
  };

  DeleteProductInCart = async (cid, productId) => {
    const cart = await cartDao.findById(cid);

    if (!cart) {
      throw new Error("No existe el carrito");
    }

    const product = await cartDao.findById(productId);

    if (!product) {
      throw new Error("No existe el producto");
    }

    const existProductInCart = cart.productos.some(
      (productCart) => productCart.id?.toString() === product.id
    );

    if (!existProductInCart) {
      throw new Error("No existe el producto en el carrito");
    }

    return await cartDao.DeleteProductInCart(cid, productId);
  };
}

export const ServiceCart = new CartSerivce();
