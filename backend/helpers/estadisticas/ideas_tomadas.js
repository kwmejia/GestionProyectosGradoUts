const { connection } = require("../../conexion/conexion");

const numIdeasTomadas = () => {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT count(*) as ideas_tomadas
    FROM idea_tomada;`,
      [],
      function (error, results) {
        resolve(results);
        reject(error);
      }
    );
  })
}

const numIdeas = () => {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT count(*) as ideas
    FROM ideas;`,
      [],
      function (error, results) {
        resolve(results);
        reject(error);
      }
    );
  })
}

const numIdeasAprobadas = () => {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT count(*) as ideas_aprobadas
    FROM ideas
    WHERE ideas.aprovado = 1;`,
      [],
      function (error, results) {
        resolve(results);
        reject(error);
      }
    );
  })
}

const numIdeasCompradas = () => {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT count(*) as ideas_compradas
    FROM idea_tomada
    WHERE idea_tomada.estado_pago = 1;`,
      [],
      function (error, results) {
        resolve(results);
        reject(error);
      }
    );
  })
}

module.exports = {
  numIdeasTomadas,
  numIdeas,
  numIdeasAprobadas,
  numIdeasCompradas
}