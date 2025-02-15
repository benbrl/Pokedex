const PokemonService = require('../services/pokemon.service');

const pokemonService = new PokemonService();

exports.addPokemon = async (req, res) => {
    try {
        const { name, types, imgUrl, description } = req.body;

        console.log(req.body)

        if (!name || !types || !imgUrl) {
            return res.status(400).send({ message: "Tous les champs obligatoires doivent être remplis mon coco" });
        }

        const existingPokemon = await pokemonService.getPokemonByName(name);
        if (existingPokemon) {
            return res.status(400).send({ message: "Ce Pokémon existe déjà." });
        }
    
        let pokemon = await pokemonService.createPokemon({ name, types, imgUrl, description });

        //Faire l'ajout de la région s'il y a un param pour

        res.status(201).send({ pokemon });

    } catch (err) {
        res.status(400).send({ message: err.message });
    }
};

exports.addRegion = async (req, res) => {
    try {
        const { region, regionId, pokemonId } = req.body;

        let pokemon = await pokemonService.getPokemonById(pokemonId);

        if (!pokemon) {
            return res.status(400).send("Le Pokémon n'existe pas.");
        }

        await pokemonService.createRegion(req.body);

        res.status(200).send({ pokemon });

    } catch (err) {
        res.status(400).send(err.message);
    }
};

exports.getPokemon = async (req, res) => {
    try {
        const ObjectId = require("mongoose").Types.ObjectId;

        let pokemon;

        console.log(req.params.id_or_name)

        if (ObjectId.isValid(req.params.id_or_name)) {
            pokemon = await pokemonService.getPokemonById(req.params.id_or_name);
        } else {
            pokemon = await pokemonService.getPokemonByName(req.params.id_or_name);
        }


        res.status(200).send({ pokemon });

    } catch (err) {
        res.status(400).send(err.message);
    }
};

exports.getPokemons = (req, res) => {

};

exports.deletePokemon = async (req, res) => {
    try {
        const ObjectId = require("mongoose").Types.ObjectId;

        let pokemon;

        console.log(req.params.id)

        if (ObjectId.isValid(req.params.id)) {
            pokemon = await pokemonService.deletePokemonById(req.params.id);
        } else {
            res.status(400).send('Id introuvable');
        }
        res.status(204).send();

    } catch (err) {
        res.status(400).send(err.message);
    }
};

exports.updatePokemon = (req, res) => {

};

exports.deleteRegion = (req, res) => {

}; 