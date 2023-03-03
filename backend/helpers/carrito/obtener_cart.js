const { connection } = require("../../conexion/conexion")

const obtenerCart = (email) => {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT ideas.id_idea, ideas.nombre_idea, ideas.id_azure_docente_correo, ideas.aprovado, ideas.fecha_creacion, carrito.id_carrito, carrito.correo_estudiante, carrito.id_idea, ideas.descripcion_idea, tipo_ideas.nombre
        FROM carrito  
        INNER JOIN ideas ON carrito.id_idea = ideas.id_idea
        INNER JOIN tipo_ideas on tipo_ideas.id_tipo_idea = ideas.id_tipo_idea
        Where carrito.correo_estudiante = ?
        `,
            [email],
            function (error, results, fields) {
                resolve(results);
                reject(error);
            }

        );
    });
};

module.exports = {
    obtenerCart
} 