
const { postIdea, deleteIdea, updateIdeaByTeacher } = require("../helpers/ideas/insertar_ideas");
const { response } = require("express");

const insertar_idea = async (req, res = response) => {
  const rta = await postIdea(req.body);
  res.json(rta);
}

const eliminar_idea = async (req, res = response) => {
  const { id } = req.query;
  const rta = await deleteIdea(id);
  res.json(rta);

}

const update_idea = async (req, res = response) => {
  const rta = await updateIdeaByTeacher(req.body);
  res.json(rta);
}

module.exports =
{
  insertar_idea,
  eliminar_idea,
  update_idea
};