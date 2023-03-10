const { getTypeIdea, getTypesIdeas } = require('../helpers/ideas/obtener_idea')

const getNameTypeIdea = async (req, res) => {
  const { id } = req.query;
  const rta = await getTypeIdea(id);
  console.log(rta)
  res.json(rta[0]);
}


const getTypesIdeasModel = async (req, res = response) => {
  const rta = await getTypesIdeas();
  res.json(rta);
};

module.exports = {
  getNameTypeIdea,
  getTypesIdeasModel
}

