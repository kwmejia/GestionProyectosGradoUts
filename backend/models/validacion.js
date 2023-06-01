const { esAdministrador } = require("../helpers/ideas/validacion_usuario.js");

const isValidation = async (req, res = response) => {
  const { email } = req.query;
  const rta = await esAdministrador(email);
  if (rta[0].admin > 0) {
    res.json(true);
    return
  }
  res.json(false);
}

module.exports = {
  isValidation
}