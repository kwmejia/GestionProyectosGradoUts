
const { obtenerIdeasFavoritas } = require('../helpers/helpers');

const ideas_favoritas = async (req, res) => {
  const rta = await obtenerIdeasFavoritas(req.query.correo)
  res.json(rta);
}


module.exports = {
  ideas_favoritas
}