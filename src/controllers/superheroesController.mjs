import { obtenerSuperheroePorId, obtenerTodosLosSuperheroes,
    buscarSuperheroesPorAtributo, obtenerSuperheroesMayoresDe30,
    crearSuperheroe, actualizarSuperheroe,
    borrarSuperheroesPorId, borrarSuperheroesPorNombre }
from '../services/superheroesService.mjs';
import { renderizarSuperheroe, renderizarListaSuperheroes }
from '../views/responseView.mjs';

export async function obtenerSuperheroePorIdController(req, res) {
    try {
        const { id } = req.params;
        const superheroe = await obtenerSuperheroePorId(id);
        if (!superheroe) {
            return res.status(404).send({ mensaje: 'Superhéroe no encontrado' });
        }
        res.status(200).json(renderizarSuperheroe(superheroe));
    } catch (error) {
        res.status(500).send({ mensaje: 'Error al obtener el superhéroe', error: error.message });
    }
}

export async function obtenerTodosLosSuperheroeController(req, res) {
    try {
        const superheroes = await obtenerTodosLosSuperheroes();
        res.render('dashboard', { superheroes });
    } catch (error) {
        res.status(500).send({ mensaje: 'Error al obtener los superhéroes', error: error.message });
    }
}

export async function buscarSuperheroesPorAtributoController(req, res) {
    try {
        const { atributo, valor } = req.params;
        const superheroes = await buscarSuperheroesPorAtributo(atributo, valor);
        if (superheroes.length === 0) {
            return res.status(404).send({ mensaje: 'No se encontraron superhéroes con ese atributo' });
        }
        res.status(200).json(renderizarListaSuperheroes(superheroes));
    } catch (error) {
        res.status(500).send({ mensaje: 'Error al buscar los superhéroes', error: error.message });
    }
}

export async function obtenerSuperheroesMayoresDe30Controller(req, res) {
    try {
        const superheroes = await obtenerSuperheroesMayoresDe30();
        if (superheroes.length === 0) {
            return res.status(404).send({ mensaje: 'No se encontraron superhéroes mayores de 30 años' });
        }
        res.status(200).json(renderizarListaSuperheroes(superheroes));
    } catch (error) {
        res.status(500).send({ mensaje: 'Error al obtener superhéroes mayores de 30', error: error.message });
    }
}

export async function crearSuperheroeController(req, res) {
    try {
        const superheroe = await crearSuperheroe(req.body);
        res.status(201).json(renderizarSuperheroe(superheroe));
    } catch (error) {
        res.status(500).send({ mensaje: 'Error al crear el superhéroe', error: error.message });
    }
}

export async function actualizarSuperheroeController(req, res) {
    try {
        const { id } = req.params;
        const superheroe = await actualizarSuperheroe(id, req.body);
        if (!superheroe) {
            return res.status(404).send({ mensaje: 'Superhéroe no encontrado' });
        }
        res.status(200).json(renderizarSuperheroe(superheroe));
    } catch (error) {
        res.status(500).send({ mensaje: 'Error al actualizar el superhéroe', error: error.message });
    }
}

export async function borrarSuperheroesPorIdController(req, res) {
    try {
        const { id } = req.params;
        const superheroe = await borrarSuperheroesPorId(id);
        if (!superheroe) {
            return res.status(404).send({ mensaje: 'Superhéroe no encontrado' });
        }
        res.status(200).json(renderizarSuperheroe(superheroe));
    } catch (error) {
        res.status(500).send({ mensaje: 'Error al borrar el superhéroe', error: error.message });
    }
}

export async function borrarSuperheroesPorNombreController(req, res) {
    try {
        const { nombre } = req.params;
        const superheroe = await borrarSuperheroesPorNombre(nombre);
        if (!superheroe) {
            return res.status(404).send({ mensaje: 'Superhéroe no encontrado' });
        }
        res.status(200).json(renderizarSuperheroe(superheroe));
    } catch (error) {
        res.status(500).send({ mensaje: 'Error al borrar el superhéroe', error: error.message });
    }
}

export function mostrarFormularioAgregarController(req, res) {
    res.render('addSuperhero');
}

export async function agregarSuperheroeController(req, res) {
    try {
        const data = req.body;

        await crearSuperheroe(data);
        res.redirect('/');
    } catch (error) {
        res.status(500).send({ mensaje: 'Error al agregar el superhéroe', error: error.message });
    }
}

export async function mostrarFormularioEditarController(req, res) {
    try {
        const { id } = req.params;
        const superheroe = await obtenerSuperheroePorId(id);
        if (!superheroe) {
            return res.status(404).send({ mensaje: 'Superhéroe no encontrado' });
        }
        res.render('editSuperhero', { superheroe });
    } catch (error) {
        res.status(500).send({ mensaje: 'Error al obtener el superhéroe', error: error.message });
    }
}

export async function editarSuperheroeController(req, res) {
    try {
        const { id } = req.params;
        const data = req.body;

        await actualizarSuperheroe(id, data);
        res.redirect('/');
    } catch (error) {
        res.status(500).send({ mensaje: 'Error al editar el superhéroe', error: error.message });
    }
}