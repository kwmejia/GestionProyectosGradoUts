const { getById } = require('../helpers/ideas/idea_tomada')


const getIdeaTomaPorId = async (req, res) => {
  const { id } = req.query;
  const rta = await getById(id);
  res.json(rta);
}

module.exports = {
  getIdeaTomaPorId
}