import express from 'express';
import {
    obtenerSuperheroePorIdController,
    obtenerTodosLosSuperheroeController,
    buscarSuperheroesPorAtributoController,
    obtenerSuperheroesMayoresDe30Controller,
    crearSuperheroeController,
    actualizarSuperheroeController,
    borrarSuperheroesPorIdController,
    borrarSuperheroesPorNombreController,
    mostrarFormularioAgregarController,
    agregarSuperheroeController,
    mostrarFormularioEditarController,
    editarSuperheroeController
} from '../controllers/superheroesController.mjs';
import { superheroeValidationRules } from '../middlewares/validationRules.mjs';
import { handleValidationErrors } from '../middlewares/errorMiddleware.mjs';

const router = express.Router();
// Middleware para convertir strings a arrays antes de validar
const parsearArrays = (req, res, next) => {
    if (req.body.poderes) req.body.poderes = req.body.poderes.split(',').map(p => p.trim());
    if (req.body.aliados) req.body.aliados = req.body.aliados.split(',').map(a => a.trim());
    if (req.body.enemigos) req.body.enemigos = req.body.enemigos.split(',').map(e => e.trim());
    next();
};

// Rutas EJS (dashboard)
router.get('/', (req, res) => res.render('index'));
router.get('/heroes/agregar', mostrarFormularioAgregarController);
router.post('/heroes/agregar', parsearArrays, superheroeValidationRules(), handleValidationErrors, agregarSuperheroeController);
router.get('/heroes/:id/editar', mostrarFormularioEditarController);
router.post('/heroes/:id/editar', parsearArrays, editarSuperheroeController);

// Rutas API JSON
router.get('/heroes', obtenerTodosLosSuperheroeController);
router.get('/heroes/mayores-30', obtenerSuperheroesMayoresDe30Controller);
router.get('/heroes/buscar/:atributo/:valor', buscarSuperheroesPorAtributoController);
router.get('/heroes/:id', obtenerSuperheroePorIdController);
router.post('/heroes', superheroeValidationRules(), handleValidationErrors, crearSuperheroeController);
router.put('/heroes/:id', actualizarSuperheroeController);
router.delete('/heroes/:id', borrarSuperheroesPorIdController);
router.delete('/heroes/nombre/:nombre', borrarSuperheroesPorNombreController);

export default router;