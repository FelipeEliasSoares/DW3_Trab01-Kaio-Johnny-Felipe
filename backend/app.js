const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const router = require("./routes/router");

const app = express();
const port = 4000;

// Configure o CORS para permitir requisições de http://localhost:3000
app.use(
  cors({
    origin: "http://localhost:3000", // permite apenas localhost:3000
    credentials: true, // se você estiver utilizando cookies ou autenticação baseada em sessão
  })
);

// Middleware para parsear cookies
app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

//@ Utiliza o routerApp configurado em ./routes/router.js
app.use(router);

app.listen(port, () => {
  console.log(`App listening at port ${port}`);
});
