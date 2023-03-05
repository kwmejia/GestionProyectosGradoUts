const { response } = require("express");
const { postData } = require('../helpers/ideas/idea_tomada');

const postIdeaTomada = async (req, res = response) => {
  // console.log(req.body);
  try {
    const rta = await postData(req.body);
    res.json(rta);
  } catch (error) {
    res.json(error);
  }

};

module.exports = {
  postIdeaTomada
};