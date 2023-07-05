import { Router } from "express";
import { CartManager } from "../../dao/managerdb/ManagerCartsDb.js";

const router =Router();
const managercart = new CartManager ();

router.get("/",(req,res)=>{
    res.render("index")
})

router.get("/view/products",async (req, res) => { 
  res.render("products");
  });


// Ruta para mostrar un carrito por su ID
router.get('/carts/:id', async (req, res) => {
  const { id } = req.params;
  console.log(id)
  try {
    const cart= await managercart.getCartById(id);
    console.log(cart)
    if (!cart) {
      return res.status(404).send('Carrito no encontrado');
    }
    res.render('cart', { productos: cart.productos });
  } catch (error) {
    console.error('Error al obtener el carrito:', error);
    res.status(500).send('Error al obtener el carrito');
  }
});





export default router;