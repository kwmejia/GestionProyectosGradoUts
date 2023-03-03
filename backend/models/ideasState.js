
const { updateIdeaAddCarrito, updateIdeaRemove } = require('../helpers/ideas/obtener_idea')

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


module.exports = {
  updateStateIdeaAddCarrito,
  updateStateIdeaRemoveCarrito
}