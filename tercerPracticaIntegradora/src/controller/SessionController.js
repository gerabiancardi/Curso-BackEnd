import CredentialsDto from "../dto/credentialsDto.js";
import { ServiceSession } from "../services/SessionServices.js";

const logout = async (req, res) => {
  const response = ServiceSession.logout(req.session);
  if (response) return res.redirect("/login");
  return res.send({ message: `logout Error`, body: err });
};

const login = async (req, res) => {
  try {
    const credentials = new CredentialsDto(req.body)
    const findUser = await ServiceSession.login(credentials);
    if (!findUser) {
      return res
        .status(401)
        .json({ message: "usuario no registrado/existente" });
    }
    req.session.user = findUser;
    return res.redirect("/products");
  } catch (error) {
    console.log(
      "🚀 ~ file: session.routes.js:47 ~ router.post ~ error:",
      error
    );
    res.status(500).send({ error: "Error interno" });
  }
};

const register = async (req, res) => {
  try {
    const {role,email,password,first_name,last_name,age} = req.body;
    const response = await ServiceSession.register({role,email,password,first_name,last_name,age})
    req.session.user = { ...response };
    return res.redirect("/login");
  } catch (error) {
    console.log(
      "🚀 ~ file: session.routes.js:66 ~ router.post ~ error:",
      error
    );
    res.status(500).send({ error: "Error interno" });
  }
};

const cambioContraseña = async (req, res) => {
  try {
    const { password, email } = req.body;
console.log(password)
console.log(email)
  const response = ServiceSession.cambioContraseña({ password, email})

    if (response?.message) {
      return res
        .status(401)
        .json(response.message);
    }
    return res.redirect("/login");
  } catch (error) {
    console.log(
      "🚀 ~ file: session.routes.js:117 ~ router.post ~ error:",
      error
    );
    res.status(500).send({ error: "Error interno" });
  }
};

const cambiarRol= async(req, res)=>{
  return await ServiceSession.cambiarRol(req.session.user)
}

const gitHubCallback = async (req, res) => {
  try {
    console.log(
      `****** USANBO ENDPOINT de github/callback PARA COMUNICARNOS *****`
    );
    req.session.user = req.user;
    res.redirect("/profile");
  } catch (error) {
    console.log("🚀 ~ file: session.routes.js:115 ~ error:", error);
    res.status(500).send({ error: "Error interno" });
  }
};

export {
  login,
  logout,
  register,
  cambioContraseña,
  gitHubCallback,
  cambiarRol
};
