const { connection } = require("../../conexion/conexion")

const validacionUsuario = () => {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT * FROM usuarios_administrativos",
      [],
      function (error, results, fields) {
        resolve(results);
        reject(error);
      }
    );
  });
};


const esAdministrador = (email) => {
  return new Promise((resolve, reject) => {
    connection.query(
      ` SELECT count(*) as admin FROM usuarios_administrativos WHERE usuarios_administrativos.correo = '${email}'`,
      [],
      function (error, results, fields) {
        resolve(results);
        reject(error);
      }
    );
  });

}

module.exports = {
  validacionUsuario,
  esAdministrador
};
