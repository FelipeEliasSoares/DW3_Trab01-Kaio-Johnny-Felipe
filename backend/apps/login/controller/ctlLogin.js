const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const mdlLogin = require("../model/mdlLogin"); // Supondo que este modelo esteja correto
const { serialize } = require("cookie");

const Login = async (req, res) => {
  try {
    const { login, senha } = req.body;

    // Busca as credenciais do usuário no banco de dados
    const credencial = await mdlLogin.GetCredencial(login);

    if (!credencial || credencial.length === 0) {
      return res.status(403).json({ message: "Usuário não identificado!" });
    }

    // Verifica a senha
    const ispasswordValid = bcrypt.compareSync(
      senha,
      credencial[0].senha
    );
    if (!ispasswordValid) {
      return res.status(403).json({ message: "Login inválido!" });
    }

    // Gera o token JWT
    const token = jwt.sign({ login }, process.env.SECRET_API, {
      expiresIn: 120 * 60, // Expira em 2 horas
    });

    // Define o token em um cookie HttpOnly
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

const Me = (req, res) => {
  try {
    const token = req.cookies.auth_token;

    if (!token) {
      return res
        .status(403)
        .json({ auth: false, message: "Token JWT não fornecido" });
    }

    jwt.verify(token, process.env.SECRET_API, (err, decoded) => {
      if (err) {
        return res
          .status(403)
          .json({ auth: false, message: "Token JWT inválido ou expirado" });
      }

      // Aqui você pode buscar mais dados do usuário no banco de dados se necessário
      const user = { login: decoded.login };

      return res.status(200).json({ user });
    });
  } catch (error) {
    console.error("Erro no me:", error);
    return res.status(500).json({ message: "Erro interno do servidor" });
  }
};

module.exports = {
  Login,
  Logout,
  Me,
};
