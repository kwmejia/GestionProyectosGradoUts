const {
  numIdeasTomadas,
  numIdeas,
  numIdeasAprobadas,
  numIdeasCompradas
} = require('../helpers/estadisticas/ideas_tomadas');

const getNumIdeasTaken = async (req, res) => {
  const rta = await numIdeasTomadas();
  res.json(rta[0]);
}

const getNumIdeas = async (req, res) => {
  const rta = await numIdeas();
  res.json(rta[0]);
}

const getNumIdeasPay = async (req, res) => {
  const rta = await numIdeasCompradas();
  res.json(rta[0]);
}

const getNumIdeasApproved = async (req, res) => {
  const rta = await numIdeasAprobadas();
  res.json(rta[0]);
}

module.exports = {
  getNumIdeasTaken,
  getNumIdeas,
  getNumIdeasPay,
  getNumIdeasApproved
}