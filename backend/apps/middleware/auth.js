const jwt = require("jsonwebtoken");
const mdlLogin = require("../login/model/mdlLogin");

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.auth_token;

    if (!token) {
      return res
        .status(403)
        .json({ auth: false, message: "Token JWT não fornecido" });
    }

    // Decodifica o token JWT
    const decoded = jwt.verify(token, process.env.SECRET_API);

    const usuario = await mdlLogin.GetUsuarioById(decoded.id);

    if (!usuario) {
      return res
        .status(404)
        .json({ auth: false, message: "Usuário não encontrado" });
    }

    // Adiciona os dados do usuário ao objeto req
    req.user = usuario;

    next(); // Prossegue para o próximo middleware ou controlador
  } catch (error) {
    if (
      error.name === "TokenExpiredError" ||
      error.name === "JsonWebTokenError"
    ) {
      return res
        .status(403)
        .json({ auth: false, message: "Token JWT inválido ou expirado" });
    }
    console.error("Erro no middleware 'authMiddleware':", error);
    return res.status(500).json({ message: "Erro interno do servidor" });
  }
};

module.exports = authMiddleware;
