const { connection } = require("../../conexion/conexion");

const aprovarIdea = (id) => {
  return new Promise((resolve, reject) => {
    connection.query(`UPDATE ideas SET aprovado = 1 WHERE (id_idea = ?);`,
      [id],
      function (error, results) {
        resolve(results);
        reject(error);
      }
    );
  })
}

const desaprovarIdea = (id) => {
  return new Promise((resolve, reject) => {
    connection.query(`UPDATE ideas SET aprovado = 0 WHERE (id_idea = ?);`,
      [id],
      function (error, results) {
        resolve(results);
        reject(error);
      }
    );
  })
}

const pagarIdea = (id) => {
  return new Promise((resolve, reject) => {
    connection.query(`UPDATE idea_tomada SET estado_pago = '1' WHERE (id_idea_tomada = ?);`,
      [id],
      function (error, results) {
        resolve(results);
        reject(error);
      }
    );
  })
}

const noPagarIdea = (id) => {
  return new Promise((resolve, reject) => {
    connection.query(`UPDATE idea_tomada SET estado_pago = '0' WHERE (id_idea_tomada = ?);`,
      [id],
      function (error, results) {
        resolve(results);
        reject(error);
      }
    );
  })
}



module.exports = {
  aprovarIdea,
  desaprovarIdea,
  pagarIdea,
  noPagarIdea
};
