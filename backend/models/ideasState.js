
const { updateIdeaAddCarrito, updateIdeaRemove } = require('../helpers/ideas/obtener_idea')
const { aprovarIdea, desaprovarIdea } = require('../helpers/ideas/idea_estado')

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

module.exports = {
  updateStateIdeaAddCarrito,
  updateStateIdeaRemoveCarrito,
  approveIdea,
  disapproveIdea
}