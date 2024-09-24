const pool = require('../config/db');


exports.create = (req, res) => {
    const {Nombre_Metodo, Resumen_Metodo, Ventajas_Metodo, Desventajas_Metodo, Referencia_Metodo } = req.body;

    const query = `INSERT INTO "métodos" ("nombre_metodo", "resumen_metodo", "ventajas_metodo", "desventajas_metodo", "referencia_metodo")
                   VALUES ($1, $2, $3, $4, $5) RETURNING *`;

    pool.query(query, [Nombre_Metodo, Resumen_Metodo, Ventajas_Metodo, Desventajas_Metodo, Referencia_Metodo], (err, results) => {
        if (err) {
            console.error('Error:', err);
            return res.status(500).json({ error: 'Error creando el método' });
        }
        res.status(201).json({ message: 'Método creado exitosamente', metodo: results.rows[0] });
    });
};

// Obtener todos los métodos
exports.getAll = (req, res) => {
    const query = 'SELECT * FROM "métodos"';

    pool.query(query, (err, results) => {
        if (err) {
            console.error('Error:', err);
            return res.status(500).json({ error: 'Error obteniendo los métodos' });
        }
        res.status(200).json(results.rows);
    });
};

// Obtener un método por ID
exports.getById = (req, res) => {
    const { id } = req.params;

    const query = 'SELECT * FROM "métodos" WHERE "id_metodo" = $1'; 
    pool.query(query, [id], (err, results) => {
        if (err) {
            console.error('Error:', err);
            return res.status(500).json({ error: 'Error obteniendo el método' });
        }
        if (results.rows.length === 0) {
            return res.status(404).json({ message: 'Método no encontrado' });
        }

        res.status(200).json(results.rows[0]);
    });
};

// Actualizar un método
exports.update = (req, res) => {
    const { id } = req.params;
    const { Nombre_Metodo, Resumen_Metodo, Ventajas_Metodo, Desventajas_Metodo, Referencia_Metodo } = req.body;

    const query = `UPDATE "métodos" 
                   SET "nombre_metodo" = $1, "resumen_metodo" = $2, "ventajas_metodo" = $3, "desventajas_metodo" = $4, "referencia_metodo" = $5
                   WHERE "id_metodo" = $6 RETURNING *`;

    pool.query(query, [Nombre_Metodo, Resumen_Metodo, Ventajas_Metodo, Desventajas_Metodo, Referencia_Metodo, id], (err, results) => {
        if (err) {
            console.error('Error:', err);
            return res.status(500).json({ error: 'Error actualizando el método' });
        }
        if (results.rowCount === 0) {
            return res.status(404).json({ message: 'Método no encontrado' });
        }

        res.status(200).json({ message: 'Método actualizado exitosamente', metodo: results.rows[0] });
    });
};

// Eliminar un método
exports.delete = (req, res) => {
    const { id } = req.params;

    const query = 'DELETE FROM "métodos" WHERE "id_metodo" = $1 RETURNING *';
    pool.query(query, [id], (err, results) => {
        if (err) {
            console.error('Error:', err);
            return res.status(500).json({ error: 'Error eliminando el método' });
        }
        if (results.rowCount === 0) {
            return res.status(404).json({ message: 'Método no encontrado' });
        }

        res.status(200).json({ message: 'Método eliminado exitosamente' });
    });
};
