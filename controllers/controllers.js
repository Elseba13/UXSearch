const pool = require('../config/db'); 

exports.create = (req,res) => {

    const {Nombre_Metodo, Resumen_Metodo, Ventajas_Metodo, Desventajas_Metodo, Referencia_Metodo} = req.body; 

    const query = `INSERT INTO "Métodos" ("Nombre_Metodo", "Resumen_Metodo", "Ventajas_Metodo", "Desventajas_Metodo", "Referencia_Metodo")
                    VALUES ($1, $2, $3, $4, $5) RETURNING *`; 

    pool.query(query,[Nombre_Metodo, Resumen_Metodo, Ventajas_Metodo, Desventajas_Metodo, Referencia_Metodo], (err, results) => {
        if(err){
            return res.status(500).json({error: 'Error creando el metodo'}); 
        }
        res.status(201).json({message: 'Método creado exitosamente', metodo: results.rows[0]});
    });
    
};

exports.getAll = (req, res) => {
    const query = 'SELECT * FROM "Métodos"'; 

    pool.query(query,(err,results) => {
        if(err){
            return res.status(500).json({error: 'Error obteniendo los métodos'});
        }
        res.status(200).json(results.rows); 
    }); 
}; 

exports.getById = (req, res) => {
    const {id} = req.params; 

    const query = 'SELECT * FROM "Métodos" WHERE "ID_Metodo" = $1'; 
    pool.query(query,[id],(err,results) => {
        if(err){
            return res.status(500).josn({error: 'Error obteniendo el método'}); 
        }
        if(results.rows.length === 0){
            return res.status(404).json({message: 'Método no encontrado'}); 

        }

        res.status(200).json(results.rows[0]);
    }); 
}; 

exports.update = (req, res) => {
    const {id} = req.params; 
    const { Nombre_Metodo, Resumen_Metodo, Ventajas_Metodo, Desventajas_Metodo, Referencia_Metodo } = req.body; 

    const query = `UPDATE "Métodos" 
                   SET "Nombre_Metodo" = $1, "Resumen_Metodo" = $2, "Ventajas_Metodo" = $3, "Desventajas_Metodo" = $4, "Referencia_Metodo" = $5
                   WHERE "ID_METODO" = $6 RETURNING *`; 

    pool.query(query, [Nombre_Metodo, Resumen_Metodo, Ventajas_Metodo, Desventajas_Metodo, Referencia_Metodo, id], (err,results) => {
        if(err){
            return res.status(500).json({error: 'Error actualizando el método'}); 
        }
        if(results.rowCount === 0){
            return res.statutus(404).json({message: 'Método no encontrado'}); 
        }

        res.status(200).json({message: 'Método actualizado exitosamente', metodo: results.rows[0]}); 
    });   
};

exports.delete = (req,res) => {
    const {id} = req.params; 

    const query = 'DELETE FROM "Métodos" WHERE "ID_Metodo" = $1 RETURNING *';
    pool.query(query, [id], (err,results) => {
        if(err){
            return res.status(500).json({error: 'Error eliminando el método'}); 
        }
        if(results.rowCount === 0){
            return res.status(404).json({message: 'Método no encontrado'}); 
        }

        res.status(200).json({message: 'Método eliminado exitosamente'}); 
    }); 
}; 