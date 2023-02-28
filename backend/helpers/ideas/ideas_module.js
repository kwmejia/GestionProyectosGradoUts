
const { validacionUsuario } = require('./validacion_usuario');
const { obtenerIdea, obtenerIdeaProfesor } = require('./obtener_idea');
const { ideaTomada } = require('./idea_tomada');
const { obtenerIdeasFavoritas } = require('./obtener_ideas_favoritas');

module.exports = {

    validacionUsuario,
    obtenerIdea,
    ideaTomada,
    obtenerIdeaProfesor,
    obtenerIdeasFavoritas
}