const express = require('express');
const router = express.Router();
const metodosController = require('../controllers/controllers');

/**
 * @swagger
 * components:
 *   schemas:
 *     Metodo:
 *       type: object
 *       required:
 *         - Nombre_Metodo
 *         - Resumen_Metodo
 *       properties:
 *         ID_Metodo:
 *           type: integer
 *           description: ID único del método
 *         Nombre_Metodo:
 *           type: string
 *           description: Nombre del método
 *         Resumen_Metodo:
 *           type: string
 *           description: Resumen del método
 *         Ventajas_Metodo:
 *           type: string
 *           description: Ventajas del método
 *         Desventajas_Metodo:
 *           type: string
 *           description: Desventajas del método
 *         Referencia_Metodo:
 *           type: string
 *           description: Referencia del método
 */

/**
 * @swagger
 * /api/metodos:
 *   get:
 *     summary: Obtiene todos los métodos
 *     tags: [Métodos]
 *     responses:
 *       200:
 *         description: Lista de métodos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Metodo'
 */
router.get('/', metodosController.getAll);

/**
 * @swagger
 * /api/metodos/{id}:
 *   get:
 *     summary: Obtiene un método por ID
 *     tags: [Métodos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del método
 *     responses:
 *       200:
 *         description: Método encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Metodo'
 *       404:
 *         description: Método no encontrado
 */
router.get('/:id', metodosController.getById);

/**
 * @swagger
 * /api/metodos:
 *   post:
 *     summary: Crea un nuevo método
 *     tags: [Métodos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Metodo'
 *     responses:
 *       201:
 *         description: Método creado exitosamente
 */
router.post('/', metodosController.create);

/**
 * @swagger
 * /api/metodos/{id}:
 *   put:
 *     summary: Actualiza un método por ID
 *     tags: [Métodos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del método
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Metodo'
 *     responses:
 *       200:
 *         description: Método actualizado exitosamente
 *       404:
 *         description: Método no encontrado
 */
router.put('/:id', metodosController.update);

/**
 * @swagger
 * /api/metodos/{id}:
 *   delete:
 *     summary: Elimina un método por ID
 *     tags: [Métodos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del método
 *     responses:
 *       200:
 *         description: Método eliminado exitosamente
 *       404:
 *         description: Método no encontrado
 */
router.delete('/:id', metodosController.delete);

module.exports = router;
