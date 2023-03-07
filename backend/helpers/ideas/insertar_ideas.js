const { connection } = require("../../conexion/conexion")

const postIdea = (body) => {
  const { title, email, type, approved, take, description } = body;
  return new Promise((resolve, reject) => {
    connection.query(`INSERT INTO ideas (nombre_idea, id_azure_docente_correo, id_tipo_idea, aprovado, tomada, descripcion_idea) VALUES (?,?,?,?,?,?)`,
      [title, email, type, approved, take, description],
      function (error, results, fields) {
        resolve(results);
        reject(error);
      }
    );
  });
};

const deleteIdea = (id) => {
  return new Promise((resolve, reject) => {
    connection.query(`DELETE FROM ideas WHERE ideas.id_idea = ?`,
      [id],
      function (error, results, fields) {
        resolve(results);
        reject(error);
      }
    );
  });
}


module.exports = {
  postIdea,
  deleteIdea
}