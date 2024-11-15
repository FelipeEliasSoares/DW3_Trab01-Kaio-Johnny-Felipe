const express = require("express");
const routerApp = express.Router();

const appLogin = require("../apps/login/controller/ctlLogin");
const appContas = require("../apps/contas/controller/ctlContas");
<<<<<<< HEAD
=======
const appUsuarios = require("../apps/usuarios/controller/ctlUsuarios");
>>>>>>> ca1511a6a7e745897970bacbaa9865e5d488f6c1
// middleware that is specific to this router
routerApp.use((req, res, next) => {
  next();
});

routerApp.get("/", (req, res) => {
  res.send("Olá mundo!");
});

// Rota Login
routerApp.post("/login", appLogin.Login);
routerApp.post("/logout", appLogin.Logout);
routerApp.get("/api/auth/me", appLogin.Me);

//Rota para testar
routerApp.get("/GetAllContas", appContas.GetAllContas);
<<<<<<< HEAD
routerApp.get("/GetContaByID/:id", appContas.GetContaByID);
routerApp.post("/InsertConta", appContas.InsertConta);
routerApp.put("/UpdateConta/:id", appContas.UpdateConta);
routerApp.delete("/DeleteConta/:id", appContas.DeleteConta);
=======
routerApp.post("/GetContaByID", appContas.GetContaByID);
routerApp.post("/InsertConta", appContas.InsertConta);
routerApp.post("/UpdateConta", appContas.UpdateConta);
routerApp.post("/DeleteConta", appContas.DeleteConta);
>>>>>>> ca1511a6a7e745897970bacbaa9865e5d488f6c1

//Rota Contas
//routerApp.get("/GetAllContas", appLogin.Me, appContas.GetAllContas);
//routerApp.post("/GetContaByID", appLogin.Me, appContas.GetContaByID);
//routerApp.post("/InsertConta", appLogin.Me, appContas.InsertConta);
//routerApp.post("/UpdateConta", appLogin.Me, appContas.UpdateConta);
//routerApp.post("/DeleteConta", appLogin.Me, appContas.DeleteConta);

<<<<<<< HEAD
=======
routerApp.get("/GetAllUsuarios", appUsuarios.GetAllUsuarios);
routerApp.get("/GetUsuarioByID/:id", appUsuarios.GetUsuarioByID);
routerApp.post("/InsertUsuario", appUsuarios.InsertUsuario);
routerApp.post("/UpdateUsuario/:id", appUsuarios.UpdateUsuario);
routerApp.delete("/DeleteUsuario/:id", appUsuarios.DeleteUsuario);

//routerApp.get("/GetAllUsuarios", appLogin.Me, appUsuarios.GetAllUsuarios);
//routerApp.post("/GetUsuarioByID", appLogin.Me, appUsuarios.GetUsuarioByID);
//routerApp.post("/InsertConta", appLogin.Me, appUsuarios.InsertUsuario);
//routerApp.post("/UpdateConta", appLogin.Me, appUsuarios.UpdateUsuario);
//routerApp.post("/DeleteUsuario", appLogin.Me, appUsuarios.DeleteUsuario);

>>>>>>> ca1511a6a7e745897970bacbaa9865e5d488f6c1
module.exports = routerApp;


