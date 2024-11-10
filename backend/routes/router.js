const express = require("express");
const routerApp = express.Router();

const appLogin = require("../apps/login/controller/ctlLogin");

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

module.exports = routerApp;
