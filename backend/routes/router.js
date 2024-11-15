const express = require("express");
const routerApp = express.Router();

const appLogin = require("../apps/login/controller/ctlLogin");
const appContas = require("../apps/contas/controller/ctlContas");
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
routerApp.get("/GetContaByID/:id", appContas.GetContaByID);
routerApp.post("/InsertConta", appContas.InsertConta);
routerApp.put("/UpdateConta/:id", appContas.UpdateConta);
routerApp.delete("/DeleteConta/:id", appContas.DeleteConta);

//Rota Contas
//routerApp.get("/GetAllContas", appLogin.Me, appContas.GetAllContas);
//routerApp.post("/GetContaByID", appLogin.Me, appContas.GetContaByID);
//routerApp.post("/InsertConta", appLogin.Me, appContas.InsertConta);
//routerApp.post("/UpdateConta", appLogin.Me, appContas.UpdateConta);
//routerApp.post("/DeleteConta", appLogin.Me, appContas.DeleteConta);

module.exports = routerApp;
