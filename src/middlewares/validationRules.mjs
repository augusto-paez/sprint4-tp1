import { body } from 'express-validator';

export const superheroeValidationRules = () => [
    body('nombreSuperHeroe')
        .notEmpty().withMessage('El nombre del superhéroe es requerido')
        .trim()
        .isLength({ min: 3 }).withMessage('El nombre del superhéroe debe tener al menos 3 caracteres')
        .isLength({ max: 60 }).withMessage('El nombre del superhéroe no puede superar los 60 caracteres'),

    body('nombreReal')
        .notEmpty().withMessage('El nombre real es requerido')
        .trim()
        .isLength({ min: 3 }).withMessage('El nombre real debe tener al menos 3 caracteres')
        .isLength({ max: 60 }).withMessage('El nombre real no puede superar los 60 caracteres'),

    body('edad')
        .notEmpty().withMessage('La edad es requerida')
        .isNumeric().withMessage('La edad debe ser un número')
        .trim()
        .isInt({ min: 0 }).withMessage('La edad no puede ser negativa'),

    body('poderes')
        .notEmpty().withMessage('Los poderes son requeridos')
        .isArray({ min: 1 }).withMessage('Los poderes deben ser un array con al menos un elemento')
        .custom((poderes) => {
            poderes.forEach(poder => {
                if (poder.trim().length < 3) throw new Error('Cada poder debe tener al menos 3 caracteres');
                if (poder.trim().length > 60) throw new Error('Cada poder no puede superar los 60 caracteres');
            });
            return true;
        })
];