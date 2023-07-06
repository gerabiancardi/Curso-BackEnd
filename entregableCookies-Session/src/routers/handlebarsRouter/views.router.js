import { Router } from "express";
import { CartManager } from "../../dao/managerdb/ManagerCartsDb.js";
import authMdw from "../../middleware/auth.middleware.js"
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

router.get("/login", async (req, res) => {
  res.render("login");
});

router.get("/register", async (req, res) => {
  res.render("register");
});

// TODO: Agregar middleware AUTH
router.get("/profile", authMdw, async (req, res) => {
  const user = req.session.user;
  console.log("🚀 ~ file: views.routes.js:16 ~ router.get ~ user:", user);
  res.render("profile", {
    user,
    carrito: {
      carritoId: "carrito-1",
      productos: [{ productoId: "1", nombre: "camisa" }],
    },
  });
});




export default router;