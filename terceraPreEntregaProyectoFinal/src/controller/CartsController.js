import {ServiceCart} from "../services/CartsServices.js"

const getCarts = async (req, res) => {
  try {
    const response = await ServiceCart.getCarts();
    if (response) {
      return res.send(response);
    }
    res.status(404).json({ error: "Carrito no encontrado" });
  } catch {
    res.send("Error");
  }
};

const getCartById = async (req, res) => {
  try {
    const cid = req.params.cid;
    const response = await ServiceCart.getCartById(cid);
    if (response) {
      return res.send(response);
    }
    res.status(404).json({ error: "Carrito no encontrado" });
  } catch {
    res.send("Error");
  }
};

const addCart = async (req, res) => {
  try {
    const products = req.body;
    const response = await ServiceCart.addCart(products);
    res.status(201).json(response);
  } catch {
    res.send("Error");
  }
};

const updateCart=async (req, res) => {
    try{
      const cid=(req.params.cid)
      const productoId=(req.params.pid)
      const response= await ServiceCart.updateCart(cid,productoId)
      res.json(response)
    }catch (error){
      console.log(error)
      res.send(error)
    }}

const deleteProductInCart=async (req, res) => {
    try{
      const cid=(req.params.cid)
      const productoId=(req.params.pid)
      const response= await ServiceCart.deleteProductInCart(cid,productoId)
      res.json(response)
    }catch (error){
      console.log(error)
      res.send(error)
    }};

    const addTicket=async (req, res) => {
      try{
        const cid=(req.params.cid)
        const user =(req.session.user)
        const response= await ServiceCart.addTicket(cid, user)
        res.json(response)
      }catch (error){
        console.log(error)
        res.send(error)
      }};



export { getCarts, getCartById, addCart, updateCart , deleteProductInCart, addTicket};
