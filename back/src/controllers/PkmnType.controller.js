const PokemonTypeService = require("../services/PkmnType.service");

exports.getPokemonType = async (req, res) => {
    try {
        const pokemonTypeService = new PokemonTypeService();
        const pokemonType = await pokemonTypeService.getValue();
        res.status(200).send(pokemonType);
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
};