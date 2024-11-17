// routes/router.js
const express = require("express");
const routerApp = express.Router();

const appLogin = require("../apps/login/controller/ctlLogin");
const appContas = require("../apps/contas/controller/ctlContas");
const Me = require("../apps/middleware/auth");
const appUsuarios = require("../apps/usuarios/controller/ctlUsuarios");

// Middleware que é específico para este router (pode ser removido se não necessário)
routerApp.use((req, res, next) => {
  next();
});

// Rota raiz para teste
routerApp.get("/", (req, res) => {
  res.send("Olá mundo!");
});

// Rotas de Autenticação
routerApp.post("/login", appLogin.Login);
routerApp.post("/logout", appLogin.Logout);
routerApp.get("/api/auth/me", Me, appLogin.Me);

// Rotas de Contas
routerApp.get("/contas", Me, appContas.GetAllContas);
routerApp.get("/contas/:id", Me, appContas.GetContaByID);
routerApp.post("/contas", Me, appContas.InsertConta);
routerApp.put("/contas/:id", Me, appContas.UpdateConta);
routerApp.delete("/contas/:id", Me, appContas.DeleteConta);

// Rotas de Usuários
routerApp.get("/usuarios", Me, appUsuarios.GetAllUsuarios);
routerApp.get("/usuarios/:id", Me, appUsuarios.GetUsuarioByID);
routerApp.post("/usuarios", Me, appUsuarios.InsertUsuario);
routerApp.put("/usuarios/:id", Me, appUsuarios.UpdateUsuario);
routerApp.delete("/usuarios/:id", Me, appUsuarios.DeleteUsuario);

// Rotas comentadas podem ser removidas se não forem necessárias
//routerApp.get("/GetAllContas", appLogin.Me, appContas.GetAllContas);
//routerApp.post("/GetContaByID", appLogin.Me, appContas.GetContaByID);
//routerApp.post("/InsertConta", appLogin.Me, appContas.InsertConta);
//routerApp.post("/UpdateConta", appLogin.Me, appContas.UpdateConta);
//routerApp.post("/DeleteConta", appLogin.Me, appContas.DeleteConta);

//routerApp.get("/GetAllUsuarios", appLogin.Me, appUsuarios.GetAllUsuarios);
//routerApp.post("/GetUsuarioByID", appLogin.Me, appUsuarios.GetUsuarioByID);
//routerApp.post("/InsertConta", appLogin.Me, appUsuarios.InsertUsuario);
//routerApp.post("/UpdateConta", appLogin.Me, appUsuarios.UpdateUsuario);
//routerApp.post("/DeleteUsuario", appLogin.Me, appUsuarios.DeleteUsuario);

module.exports = routerApp;
