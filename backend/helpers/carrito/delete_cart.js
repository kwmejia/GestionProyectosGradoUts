const { connection } = require("../../conexion/conexion")

const deleteCart = (email, id_cart) => {
	return new Promise((resolve, reject) => {
		connection.query(`DELETE FROM carrito WHERE id_idea = ? AND correo_estudiante = ?`,
			[id_cart, email],
			function (error, results, fields) {
				resolve(results);
				reject(error);
			}

		);
	});
};

module.exports = {
	deleteCart
} 