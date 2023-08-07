const logout = async (req, res) => {
  req.session.destroy((err) => {
    if (!err) return res.redirect("/login");
    return res.send({ message: `logout Error`, body: err });
  });
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const findUser = await userManager.findUser({ email });
    console.log(findUser);
    if (!findUser) {
      return res
        .status(401)
        .json({ message: "usuario no registrado/existente" });
    }
    debugger;
    const isValidComparePsw = isValidPasswd(password, findUser.password);
    if (!isValidComparePsw) {
      return res.status(401).json({
        message: `las credenciales son erroneas, por favor reviselas`,
      });
    }

    req.session.user = {
      ...findUser,
      password: "",
    };

    return res.redirect(
      "/products" /* , {
        last_name: req.session?.user?.last_name || findUser.last_name,
        email: req.session?.user?.email || email,
        age: req.session?.user?.age || findUser.age,
      } */
    );
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
    const body = req.body;
    body.role = body.role == "admin" ? body.role : "user";
    body.password = await createHashValue(body.password);
    const newUser = await userManager.addUser(body);
    console.log(
      "🚀 ~ file: session.routes.js:58 ~ router.post ~ newUser:",
      newUser
    );

    req.session.user = { ...body };
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
    console.log("BODY UPDATE****", req.body);
    const { new_password, email } = req.body;

    const newPswHashed = await createHashValue(new_password);
    const user = await userModel.findOne({ email });

    if (!user) {
      return res
        .status(401)
        .json({ message: `credenciales invalidas o erroneas` });
    }

    const updateUser = await userModel.findByIdAndUpdate(user._id, {
      password: newPswHashed,
    });

    if (!updateUser) {
      return res.json({ message: "problemas actualizando la contrasena" });
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

const loginGitHUb = async (req, res) => {
  console.log(`****** USANBO ENDPOINT CON STRATEGIA DE GITHUB *****`);
};

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

export {login, logout, register, cambioContraseña, gitHubCallback, loginGitHUb}