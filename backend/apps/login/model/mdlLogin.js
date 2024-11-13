const db = require("../../../database/databaseconfig");

const GetCredencial = async (loginPar) => {
  return (
    await db.query(
      "select login, senha " +
        "from usuario where login = $1",
      [loginPar]
    )
  ).rows;
};

module.exports = {
  GetCredencial,
};
