class PokemonTypeService {
    constructor() {
        this.PokemonTypeModel = require('../models/PkmnType.model');
        this.PokemonModel = require('../models/Pokemon.model');
        this.bcrypt = require('../../node_modules/bcrypt');
    }

    async getValue() {
        const types = this.PokemonTypeModel.default;
        return {
            data: types,
            count: types.length
        };
    }

}


module.exports = PokemonTypeService;
