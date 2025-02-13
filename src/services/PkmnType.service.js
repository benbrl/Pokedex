const path = require('path');
const pokemonType = require('../models/PkmnType.model');

class PokemonTypeService {
    constructor() {
        this.pokemonType = pokemonType;
    }


    async getValue() {
        const types = this.pokemonType.default;
        return {
            data: types,
            count: types.length
        };
    }

}

module.exports = PokemonTypeService;
