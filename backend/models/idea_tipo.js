const { getTypeIdea } = require('../helpers/ideas/obtener_idea')

const getNameTypeIdea = async (req, res) => {
  const { id } = req.query;
  const rta = await getTypeIdea(id);
  console.log(rta)
  res.json(rta[0]);
}


module.exports = {
  getNameTypeIdea
}

