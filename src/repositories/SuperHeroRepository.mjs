import SuperHero from '../models/SuperHero.mjs';
import IRepository from './IRepository.mjs';

class SuperHeroRepository extends IRepository {
    async obtenerPorId(id) {
        return await SuperHero.findById(id);
    }

    async obtenerTodos() {
        return await SuperHero.find({});
    }

    async buscarPorAtributo(atributo, valor) {
        return await SuperHero.find({ [atributo]: valor });
    }

    async obtenerMayoresDe30() {
        return await SuperHero.find({ edad: { $gt: 30 } });
    }

    async crear(data) {
        const superheroe = new SuperHero(data);
        return await superheroe.save();
    }

    async actualizar(id, data) {
        return await SuperHero.findByIdAndUpdate(id, data, { new: true });
    }

    async borrarPorId(id) {
        return await SuperHero.findByIdAndDelete(id);
    }

    async borrarPorNombre(nombre) {
        return await SuperHero.findOneAndDelete({ nombreSuperHeroe: nombre });
    }
}

export default new SuperHeroRepository();