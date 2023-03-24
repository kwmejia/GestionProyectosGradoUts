const { response, query } = require("express");
const { obtenerIdeaProfesor, obtenerIdeaProfesorId, obtenerIdeasTomadasProfesor } = require("../helpers/ideas/obtener_idea");

const getIdeasProfesor = async (req, res = response) => {
  const { email } = req.query;
  const rta = await obtenerIdeaProfesor(email);
  res.json(rta);
};

const getIdeaProfesorId = async (req, res = response) => {
  const { id } = req.params;
  const { email } = req.query;
  const rta = await obtenerIdeaProfesorId(id, email);
  res.json(rta);
}

const getIdeasTomadasProfesor = async (req, res = response) => {
  const { email } = req.query;
  const rta = await obtenerIdeasTomadasProfesor(email);
  res.json(rta)
}

module.exports = {
  getIdeasProfesor,
  getIdeaProfesorId,
  getIdeasTomadasProfesor
};
