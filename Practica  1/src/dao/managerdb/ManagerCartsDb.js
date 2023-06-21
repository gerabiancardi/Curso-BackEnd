import cartsModel from "../models/carts.models.js";

export class CartManager {

   addCart= async(product)=>{
        const id= product._id
        const cart= await this.getCartById(id);
/*         if(cart){

        } */
        const newCart = await cartsModel.create(product);
        return newCart;
      } 

      getCarts = async () => {
        try {
          const cartsArr = await cartsModel.find({});
          return cartsArr;
        } catch (error) {
          console.log(
            "No se encontraron carritos",
            error
          );
        }
      };
    
      getCartById = async (id) => {
        try {
          const cartDetail = await cartsModel.findById({ _id: id });
          return cartDetail;
        } catch (error) {
          console.log(
            "no se encontro carrito",
            error
          );
        }
      };
/*         updateCart = async (cid, pid, quantity) => {
          const cartDetail = await cartsModel.findById({ _id: cid })
          if (!cartDetail){
            return ("Carrito no encontrado")
          }
          const productoAactualizar =cartDetail.productos.find((producto)=>{
            return pid==producto._id
          })
          productoAactualizar.quantity=quantity.quantity
          return;
        } */
      };
    
