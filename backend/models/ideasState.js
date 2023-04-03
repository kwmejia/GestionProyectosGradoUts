const { updateIdeaAddCarrito, updateIdeaRemove } = require('../helpers/ideas/obtener_idea')
const { aprovarIdea, desaprovarIdea, noPagarIdea, pagarIdea } = require('../helpers/ideas/idea_estado')
const { deleteIdeaTaken } = require('../helpers/ideas/idea_tomada')

const updateStateIdeaAddCarrito = async (req, res) => {
  const { id } = req.query;
  const rta = await updateIdeaAddCarrito(id);
  res.json(rta);
}

const updateStateIdeaRemoveCarrito = async (req, res) => {
  const { id } = req.query;
  const rta = await updateIdeaRemove(id);
  res.json(rta);
}

const approveIdea = async (req, res) => {
  const { id } = req.query;
  const rta = await aprovarIdea(id);
  res.json(rta)
}

const disapproveIdea = async (req, res) => {
  const { id } = req.query;
  const rta = await desaprovarIdea(id);
  res.json(rta)
}

const payIdea = async (req, res) => {
  const { id } = req.query;
  const rta = await pagarIdea(id);
  res.json(rta);
}

const noPayIdea = async (req, res) => {
  const { id } = req.query;
  const rta = await noPagarIdea(id);
  res.json(rta);
}

const eliminarIdeaTomada = async (req, res) => {
  const { id } = req.params;
  const rta = await deleteIdeaTaken(id);
  res.json(rta)
}

module.exports = {
  updateStateIdeaAddCarrito,
  updateStateIdeaRemoveCarrito,
  approveIdea,
  disapproveIdea,
  noPayIdea,
  payIdea,
  eliminarIdeaTomada
}