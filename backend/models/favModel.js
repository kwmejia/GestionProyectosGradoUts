const { obtenerFav } = require("../helpers/helpers");
const UserValidation = require("../classes/response_user_validation");
const { response } = require("express");

const favModel = async (req, res) => {
  const rta = await obtenerFav(req.query.email);
  res.json(rta);
};

module.exports = {
  favModel
};