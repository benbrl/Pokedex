const PokemonService = require('../services/pokemon.service');

const pokemonService = new PokemonService();

exports.addPokemon = async (req, res) => {
    try {
        const { name, types, imgUrl, description, soundUrl, height, weight } = req.body;

        console.log(req.body)

        if (!name || !types || !imgUrl) {
            return res.status(400).send({ message: "Tous les champs obligatoires doivent être remplis mon coco" });
        }

        const existingPokemon = await pokemonService.getPokemonByName(name);
        if (existingPokemon) {
            return res.status(400).send({ message: "Ce Pokémon existe déjà." });
        }

        let pokemon = await pokemonService.createPokemon({ name, types, imgUrl, description, soundUrl, height, weight });

        //Faire l'ajout de la région s'il y a un param pour

        res.status(201).send({ pokemon });

    } catch (err) {
        res.status(400).send({ message: err.message });
    }
};

exports.addRegion = async (req, res) => {
    try {
        const { region, regionId, pokemonId } = req.body;

        console.log(req.body);

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
            res.status(400).send('Id du pokemon est introuvable');
        }
        res.status(204).send();

    } catch (err) {
        res.status(400).send(err.message);
    }
};

exports.updatePokemon = async (req, res) => {
    try {
        const ObjectId = require("mongoose").Types.ObjectId;

        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).send({ message: "Id du Pokémon est introuvable" });
        }

        console.log("ID reçu :", req.params.id);
        console.log("Données reçues :", req.body);

        // Mise à jour du Pokémon
        let updatedPokemon = await pokemonService.updatePokemonById(req.params.id, req.body);

        // Vérification et mise à jour des régions si incluses dans la requête
        if (req.body.regions && Array.isArray(req.body.regions)) {
            for (const region of req.body.regions) {
                await pokemonService.updateRegion(req.params.id, region);
            }
        }

        // Récupération du Pokémon complet après mise à jour
        updatedPokemon = await pokemonService.getPokemonById(req.params.id);

        res.status(200).send({ pokemon: updatedPokemon });

    } catch (err) {
        console.error("Erreur lors de la mise à jour du Pokémon :", err);
        res.status(400).send({ message: err.message });
    }
};


exports.deleteRegion = async (req, res) => {
    try {
        console.log(req.params.id);
        console.log(req.body.regionName);

        const pokemonId = req.params.id;
        const regionName = req.body.regionName;

        const updatedPokemon = await pokemonService.deleteRegionById(pokemonId, regionName);
        res.status(204).send();
    } catch (err) {
        res.status(400).send({ message: err.message });
    }
};

exports.searchPokemons = async (req, res) => {
    try {
        // console.log(req.query);
        const result = await pokemonService.searchPokemons(req.query);

        res.status(200).json({
            data: result,
        
        });
    } catch (err) {
        console.error("Erreur pendant la recherche:", err);
        res.status(400).json({ message: err.message });
    }
};