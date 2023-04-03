const { ideaTomada } = require("../helpers/helpers");
const { obtenerTodasIdeas } = require("../helpers/ideas/obtener_idea");
const UserValidation = require("../classes/response_user_validation");
const { response, query } = require("express");

const ideaTomadaModel = async (req, res = response) => {
    const { search, state } = req.query
    const queryIdeaTomada = await ideaTomada(search, state);
    res.json(queryIdeaTomada);
};

const getAllIdeas = async (req, res = response) => {
    const { search, state } = req.query
    const resp = await obtenerTodasIdeas(search, state);
    res.json(resp);
}
module.exports = {
    ideaTomadaModel,
    getAllIdeas
};
