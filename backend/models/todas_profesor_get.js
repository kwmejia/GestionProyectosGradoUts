const { response, query } = require("express");
const { obtenerIdeaProfesor } = require("../helpers/ideas/obtener_idea");

const getIdeasProfesor = async (req, res = response) => {
  const { email } = req.query;
  const rta = await obtenerIdeaProfesor(email);
  res.json(rta);
};

module.exports = {
  getIdeasProfesor
};
