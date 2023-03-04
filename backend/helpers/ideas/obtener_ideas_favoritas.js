const { connection } = require("../../conexion/conexion")

const obtenerIdeasFavoritas = (email) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT  ideas.id_idea, ideas.nombre_idea, ideas.id_azure_docente_correo, tipo_ideas.nombre, ideas.aprovado, ideas.fecha_creacion, descripcion_idea, ideas.id_tipo_idea
      FROM ideas_favoritas
      INNER JOIN ideas ON
      ideas_favoritas.id_idea = ideas.id_idea
      INNER JOIN tipo_ideas ON tipo_ideas.id_tipo_idea = ideas.id_tipo_idea
      WHERE ideas.aprovado = 1
      AND ideas.tomada = 0
      AND ideas_favoritas.correo_estudiante = ? ;`,
      [email],
      function (error, results, fields) {
        resolve(results);
        reject(error);
      }
    );
  });
};

module.exports = {
  obtenerIdeasFavoritas
};
