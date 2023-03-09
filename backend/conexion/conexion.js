const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'database-veterinaria.csgjv8odblku.us-east-1.rds.amazonaws.com',
  user: 'admin',
  password: 'V3tD4l1#FAFA',
  database: 'cds_gestion_proyectos'
});

connection.connect();

module.exports = {
  connection
}