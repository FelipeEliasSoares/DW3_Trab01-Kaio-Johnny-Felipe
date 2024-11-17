//* Importa o JWT e o Bcrypt
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

//* Importa o modelo de login
const mdlLogin = require("../model/mdlLogin");

//* Importa a função 'serialize' do módulo 'cookie'
const { serialize } = require("cookie");

// Controlador para Login
const Login = async (req, res) => {
  try {
    const { login, senha } = req.body;

    // Busca as credenciais do usuário no banco de dados
    const credencial = await mdlLogin.GetCredencial(login);

    if (!credencial || credencial.length === 0) {
      return res.status(403).json({ message: "Usuário não identificado!" });
    }

    // Verifica a senha
    const ispasswordValid = bcrypt.compareSync(senha, credencial[0].senha);

    if (!ispasswordValid) {
      return res.status(403).json({ message: "Login inválido!" });
    }

    // Gera o token JWT incluindo o 'id' do usuário
    const token = jwt.sign(
      { id: credencial[0].id, login },
      process.env.SECRET_API,
      {
        expiresIn: 120 * 60, // Expira em 2 horas
      }
    );

    // Define o token em um cookie
    res.setHeader(
      "Set-Cookie",
      serialize("auth_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 120 * 60,
        path: "/",
      })
    );

    return res.status(200).json({ auth: true, message: "Login bem-sucedido!" });
  } catch (error) {
    console.error("Erro no login:", error);
    return res.status(500).json({ message: "Erro interno do servidor" });
  }
};

// Controlador para Logout
const Logout = (req, res) => {
  try {
    // Limpa o cookie auth_token
    res.setHeader(
      "Set-Cookie",
      serialize("auth_token", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        expires: new Date(0), // Expira imediatamente
        path: "/",
      })
    );

    return res
      .status(200)
      .json({ auth: false, message: "Logout bem-sucedido" });
  } catch (error) {
    console.error("Erro no logout:", error);
    return res.status(500).json({ message: "Erro interno do servidor" });
  }
};

// Controlador para 'Me'
const Me = (req, res) => {
  try {
    // Usa as informações adicionadas pelo middleware
    const { id, login } = req.user;

    return res.status(200).json({
      user: { id, login },
      message: "Informações do usuário retornadas com sucesso.",
    });
  } catch (error) {
    console.error("Erro no controlador 'Me':", error);
    return res.status(500).json({ message: "Erro interno do servidor" });
  }
};

module.exports = {
  Login,
  Logout,
  Me,
};
