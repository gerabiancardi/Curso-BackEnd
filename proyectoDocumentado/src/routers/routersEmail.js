import { Router } from "express";
import nodemailer from "nodemailer";
import { EMAIL, PSW_EMAIL } from "../config/config.js";

const router = Router();
const transporter = nodemailer.createTransport({
  service: "gmail",
  user: EMAIL,
  port: 465,
  secure: true,
  auth: {
    user: EMAIL,
    pass: PSW_EMAIL,
  },
});

router.post("/recuperarClave", async (req, res) => {
  try {
    let result = await transporter.sendMail({
      FROM: EMAIL,
      to: req.body.email,
      subject: `sending email with nodemail and Gmail as provider`,
      html: `
        <div>
          <h1>Esto es un email de prueba</h1>
          <a href="http://localhost:8080/formularioNuevaClave">Recuperar Clave<a/>
        </div>
        `,
    });
    console.log(
      "🚀 ~ file: email.routes.js:32 ~ router.post ~ result:",
      result
    );
    return res.send({ ok: true, message: `email send to ${req.body.email}` });
  } catch (error) {
    console.log("🚀 ~ file: email.routes.js:36 ~ router.post ~ error:", error);
  }
});

export { router as emailsRouter };
