import { Serviceproduct } from "../services/ProductServices.js";
const renderProduct = (req, res) => {
  res.redirect("/products");
};

const getPaginateProducts = async (req, res) => {
  try {
    const { limit, page, sort, ...query } = req.query;

    const queryLimit = limit ? Number(limit) : 10;

    const {
      docs: products,
      totalPages,
      prevPage,
      nextPage,
      page: productsPage,
      hasPrevPage,
      hasNextPage,
    } = await Serviceproduct.getPaginateProducts({
      limit: queryLimit,
      page: page ? Number(page) : 1,
      sort: sort ? { price: sort } : undefined,
      query: query ? query : undefined,
    });
    const response = {
      payload: products,
      totalPages,
      prevPage,
      nextPage,
      page: productsPage,
      prevPage,
      hasPrevPage,
      hasNextPage,
      prevLink: hasPrevPage
        ? `http://localhost:8080/api/products?limit=${queryLimit}&page=${prevPage}`
        : null,
      nextLink: hasNextPage
        ? `http://localhost:8080/api/products?limit=${queryLimit}&page=${nextPage}`
        : null,
    };
    res.render("products", {
      response,
      last_name: req.session?.user?._doc.last_name,
      email: req.session?.user?._doc.email,
      age: req.session?.user?._doc.age,
    });
  } catch (error) {
    req.logger.error(`Ocurrio un error en : ${req.originalUrl}`);
    res.send("Error");
    res.status(500).send({ error: "Error interno" });
  }
};

const getCartById = async (req, res) => {
  const { id } = req.params;
  try {
    const cart = await managercart.getCartById(id);
    console.log(cart);
    if (!cart) {
      return res.status(404).send("Carrito no encontrado");
    }
    res.render("cart", { productos: cart.productos });
  } catch (error) {
    req.logger.error(`Ocurrio un error en : ${req.originalUrl}`);
    res.status(500).send("Error al obtener el carrito");
  }
};

const login = async (req, res) => {
  req.logger.error(`Ocurrio un error en : ${req.originalUrl}`)
  res.render("login");
};

const register = async (req, res) => {
  res.render("register");
};

const getProfile = async (req, res) => {
  console.log(req.session.user, "REQ.SESSION");
  const user = req.session.user;
  req.logger.info(`Informacion`);
  res.render("profile", {
    user,
    carrito: {
      carritoId: "carrito-1",
      productos: [{ productoId: "1", nombre: "camisa" }],
    },
  });
};

export {
  login,
  getProfile,
  getCartById,
  getPaginateProducts,
  register,
  renderProduct,
};
