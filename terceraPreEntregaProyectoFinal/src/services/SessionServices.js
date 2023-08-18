import { sessionDao } from "../dao/SessionDao.js";
import { createHashValue, isValidPasswd } from "../utils/encrypt.js";
import { ServiceCart } from "./CartsServices.js";

class SessionService {
  logout = async (session) => {
    session.destroy((err) => {
      if (!err) return false;
      return true;
    });
  };

  login = async ({email,password}) => {
    try {
      const findUser = await sessionDao.findUser({ email });
      console.log(findUser);
      if (!findUser) {
        return false
      }
      const isValidComparePsw = isValidPasswd(password, findUser.password);
      if (!isValidComparePsw) {
        return false;
      }

      return {
        ...findUser,
        password: "",
      };

    } catch (error) {
      console.log(
        "🚀 ~ file: session.routes.js:47 ~ router.post ~ error:",
        error
      );
      throw new Error({ error: "Error interno" });
    }
  };

  register = async (body) => {
    try {
      body.role = body.role == "ADMIN" ? body.role : "USER";
      body.password = await createHashValue(body.password);
      const cart = await ServiceCart.addCart([])
      const userData={...body, cartId: cart._id}
      const newUser = await sessionDao.addUser(userData);
      console.log(
        "🚀 ~ file: session.routes.js:58 ~ router.post ~ newUser:",
        newUser
      );

      return newUser;
    } catch (error) {
      console.log(
        "🚀 ~ file: session.routes.js:66 ~ router.post ~ error:",
        error
      );
      throw new Error({ error: "Error interno" });
    }
  };

  cambioContraseña = async ({new_password, email}) => {
    try {
      const newPswHashed = await createHashValue(new_password);
      const user = await sessionDao.findUser({ email });

      if (!user) {
        return ({ message: `credenciales invalidas o erroneas` });
      }

      const updateUser = await sessionDao.updateUser(user._id, newPswHashed);

      if (!updateUser) {
        return ({ message: "problemas actualizando la contrasena" });
      }
      return true
    } catch (error) {
      console.log(
        "🚀 ~ file: session.routes.js:117 ~ router.post ~ error:",
        error
      );
      throw new Error ({ error: "Error interno" });
    }
  };
}

export const ServiceSession = new SessionService();
