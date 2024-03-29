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

const obtenerTodasIdeas = (search, state) => {
  let filterApproved = "";
  if (state == "1") filterApproved = "AND ideas.aprovado = 1"
  else if (state == "0") filterApproved = "AND ideas.aprovado = 0"
  else filterApproved = ""

  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT ideas.id_idea, ideas.nombre_idea, ideas.id_azure_docente_correo, tipo_ideas.nombre, ideas.aprovado, ideas.fecha_creacion, descripcion_idea FROM ideas \
      INNER JOIN tipo_ideas on tipo_ideas.id_tipo_idea = ideas.id_tipo_idea \
      WHERE ideas.nombre_idea like '%${search}%' \
      ${filterApproved} \
      ORDER BY ideas.fecha_creacion DESC`,
      [search],
      function (error, results, fields) {
        resolve(results)
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

const obtenerIdeasTomadasProfesor = (email) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT ideas.id_idea, ideas.id_azure_docente_correo, tipo_ideas.nombre, ideas.nombre_idea, idea_tomada.id_azure_estudiante_correo, idea_tomada.fecha_aceptado
      FROM ideas
      INNER JOIN idea_tomada ON  idea_tomada.id_idea = ideas.id_idea
      INNER JOIN tipo_ideas ON tipo_ideas.id_tipo_idea = ideas.id_tipo_idea
      WHERE ideas.id_azure_docente_correo = ?`,
      [email],
      function (error, results) {
        resolve(results);
        reject(error);
      }
    )
  })
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
  getTypesIdeas,
  obtenerIdeasTomadasProfesor,
  obtenerTodasIdeas
};