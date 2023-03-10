const { connection } = require("../../conexion/conexion")

const obtenerIdea = () => {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT ideas.id_idea, ideas.nombre_idea, ideas.id_azure_docente_correo, tipo_ideas.nombre, ideas.aprovado, ideas.fecha_creacion, descripcion_idea FROM ideas \
      INNER JOIN tipo_ideas on tipo_ideas.id_tipo_idea = ideas.id_tipo_idea WHERE ideas.aprovado = 1  AND ideas.tomada = 0;",
      [],
      function (error, results, fields) {
        resolve(results);
        reject(error);
      }
    );
  });
};

const obtenerIdeaProfesor = (correo) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT ideas.id_idea, ideas.nombre_idea, ideas.id_azure_docente_correo, tipo_ideas.nombre, ideas.aprovado, ideas.fecha_creacion, descripcion_idea
      FROM ideas
      INNER JOIN tipo_ideas on tipo_ideas.id_tipo_idea = ideas.id_tipo_idea
      WHERE ideas.id_azure_docente_correo = ?
      ORDER BY ideas.fecha_creacion DESC`,
      [correo],
      function (error, results, fields) {
        resolve(results);
        reject(error);
      }
    );
  });
};

const obtenerIdeasTomadasProfesor = () => {

}

const obtenerIdeaProfesorId = (id, email) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT ideas.id_idea, ideas.nombre_idea, ideas.id_tipo_idea, descripcion_idea
      FROM ideas
      INNER JOIN tipo_ideas on tipo_ideas.id_tipo_idea = ideas.id_tipo_idea 
      WHERE ideas.id_idea = ?
      AND ideas.id_azure_docente_correo = ?`,
      [id, email],
      function (error, results, fields) {
        resolve(results[0]);
        reject(error);
      }
    );
  });
};


const updateIdeaAddCarrito = (idIdea) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `UPDATE ideas SET tomada = 1 WHERE (id_idea =  ?);`,
      [idIdea],
      function (error, results, fields) {
        resolve(results);
        reject(error);
      }
    );
  });
}

const updateIdeaRemove = (idIdea) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `UPDATE ideas SET tomada = 0 WHERE (id_idea =  ?);`,
      [idIdea],
      function (error, results, fields) {
        resolve(results);
        reject(error);
      }
    );
  });
}


const getTypeIdea = (id) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT id_tipo_idea , nombre
      FROM tipo_ideas
      WHERE tipo_ideas.id_tipo_idea = ?;`,
      [id],
      function (error, results, fields) {
        resolve(results);
        reject(error);
      }
    );
  });
}

const getTypesIdeas = () => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT * FROM tipo_ideas;`,
      [],
      function (error, results) {
        resolve(results);
        reject(error);
      }
    )
  })
}

module.exports = {
  obtenerIdea,
  obtenerIdeaProfesor,
  updateIdeaAddCarrito,
  updateIdeaRemove,
  getTypeIdea,
  obtenerIdeaProfesorId,
  getTypesIdeas
};