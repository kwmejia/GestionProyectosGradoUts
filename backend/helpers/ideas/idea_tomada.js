const { connection } = require("../../conexion/conexion");

const ideaTomada = (search, state) => {
  let filterPay = "";
  if (state == "1") filterPay = "AND idea_tomada.estado_pago = 1"
  else if (state == "0") filterPay = "AND idea_tomada.estado_pago = 0"
  else filterPay = ""
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT idea_tomada.id_idea_tomada, idea_tomada.estado, idea_tomada.estado_pago, idea_tomada.cooldown, idea_tomada.id_azure_estudiante_correo, ideas.nombre_idea, idea_tomada.fecha_aceptado FROM idea_tomada \ 
      INNER JOIN ideas on ideas.id_idea = idea_tomada.id_idea \
       WHERE  ideas.nombre_idea like '%${search}%' \
       ${filterPay}`,
      [search],
      function (error, results, fields) {
        resolve(results);
        reject(error);
      }
    );
  });
};


const postData = (body) => {
  const { estado, cooldown, correo, idIdea, fechaAceptado } = body;
  const pago = 0;
  return new Promise((resolve, reject) => {
    connection.query(
      `INSERT INTO idea_tomada (estado, estado_pago, id_azure_estudiante_correo, id_idea) VALUES (?,?,?,? )`,
      [estado, pago, correo, idIdea],
      function (error, results, fields) {
        resolve(results);
        reject(error);
      }
    );
  })
}


const getById = (id) => {
  return new Promise((resolve, reject) => {
    connection.query(`Select * FROM idea_tomada WHERE id_idea = ${id}`,
      [],
      function (error, results) {
        resolve(results);
        reject(error);
      }
    );
  })
}

const deleteIdeaTaken = (id) => {
  return new Promise((resolve, reject) => {
    connection.query(`DELETE FROM idea_tomada WHERE id_idea_tomada = ?`,
      [id],
      function (error, results) {
        resolve(results);
        reject(error);
      }
    );
  })
}

module.exports = {
  ideaTomada,
  postData,
  getById,
  deleteIdeaTaken
};
