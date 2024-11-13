const mdlConta = require("../model/mdlContas");

// Função para obter todas as contas
const GetAllContas = async (req, res) => {
  try {
    const registros = await mdlConta.GetAllContas();
    res.json({ status: "ok", registros });
  } catch (error) {
    res.status(500).json({ status: "erro", mensagem: "Erro ao obter as contas", erro: error.message });
  }
};

// Função para obter uma conta por ID
const GetContaByID = async (req, res) => {
  try {
    const contaID = parseInt(req.body.id);  // Assegure-se de que está enviando um ID no corpo da requisição
    const registro = await mdlConta.GetContaByID(contaID);
    if (registro) {
      res.json({ status: "ok", registro });
    } else {
      res.status(404).json({ status: "erro", mensagem: "Conta não encontrada" });
    }
  } catch (error) {
    res.status(500).json({ status: "erro", mensagem: "Erro ao buscar conta", erro: error.message });
  }
};

// Função para inserir uma nova conta
const InsertConta = async (req, res) => {
  try {
    const registro = req.body;
    const { msg, linhasAfetadas } = await mdlConta.InsertConta(registro);
    res.json({ status: msg, linhasAfetadas });
  } catch (error) {
    res.status(500).json({ status: "erro", mensagem: "Erro ao inserir conta", erro: error.message });
  }
};

// Função para atualizar uma conta existente
const UpdateConta = async (req, res) => {
  try {
    const registro = req.body;
    const { msg, linhasAfetadas } = await mdlConta.UpdateConta(registro);
    res.json({ status: msg, linhasAfetadas });
  } catch (error) {
    res.status(500).json({ status: "erro", mensagem: "Erro ao atualizar conta", erro: error.message });
  }
};

// Função para deletar uma conta
const DeleteConta = async (req, res) => {
  try {
    const registro = req.body;
    const { msg, linhasAfetadas } = await mdlConta.DeleteConta(registro);
    res.json({ status: msg, linhasAfetadas });
  } catch (error) {
    res.status(500).json({ status: "erro", mensagem: "Erro ao deletar conta", erro: error.message });
  }
};

module.exports = {
  GetAllContas,
  GetContaByID,
  InsertConta,
  UpdateConta,
  DeleteConta
};
