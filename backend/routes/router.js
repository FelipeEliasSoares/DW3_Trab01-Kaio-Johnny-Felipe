//* Importa o express
const express = require("express");

//* Cria o roteador
const routerApp = express.Router();

//* Importa o controlador de login
const appLogin = require("../apps/login/controller/ctlLogin");

//* Importa o controlador de contas
const appContas = require("../apps/contas/controller/ctlContas");

//* Importa o middleware de autenticação
const Me = require("../apps/middleware/auth");

//* Importa o controlador de usuários
const appUsuarios = require("../apps/usuarios/controller/ctlUsuarios");

routerApp.use((req, res, next) => {
  next();
});

//* Rota raiz para teste
routerApp.get("/", (req, res) => {
  res.send("Olá mundo!");
});

//* Rotas de Autenticação
routerApp.post("/login", appLogin.Login);
routerApp.post("/logout", appLogin.Logout);
routerApp.get("/api/auth/me", Me, appLogin.Me);

//* Rotas de Contas
routerApp.get("/contas", Me, appContas.GetAllContas);
routerApp.get("/contas/:id", Me, appContas.GetContaByID);
routerApp.post("/contas", Me, appContas.InsertConta);
routerApp.put("/contas/:id", Me, appContas.UpdateConta);
routerApp.delete("/contas/:id", Me, appContas.DeleteConta);

//* Rotas de Usuários
routerApp.get("/usuarios", Me, appUsuarios.GetAllUsuarios);
routerApp.get("/usuarios/:id", Me, appUsuarios.GetUsuarioByID);
routerApp.post("/usuarios", Me, appUsuarios.InsertUsuario);
routerApp.put("/usuarios/:id", Me, appUsuarios.UpdateUsuario);
routerApp.delete("/usuarios/:id", Me, appUsuarios.DeleteUsuario);

module.exports = routerApp;
