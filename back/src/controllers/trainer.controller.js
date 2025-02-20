
const TrainerService = require('../services/trainer.service');
const trainerService = new TrainerService();
const PokemonService = require('../services/pokemon.service')
const pokemonService = new PokemonService();

exports.createTrainer = async (req, res) => {
    try {
        const userId = req.auth.userId;
        const { trainerName, imgUrl } = req.body;
        const newTrainer = await trainerService.createTrainer(userId, trainerName, imgUrl);
        res.status(201).send(newTrainer);
    } catch (err) {
        res.status(400).send({ message: err.message });
    }
};

exports.getTrainer = async (req, res) => {
    try {
        const userId = req.auth.userId;
        console.log(userId);
        const trainer = await trainerService.getTrainerByUserId(userId);
        res.status(200).send(trainer);
    } catch (err) {
        res.status(400).send({ message: err.message });
    }
};

exports.updateTrainer = async (req, res) => {
    try {
        const userId = req.auth.userId;
        const updates = req.body;
        const trainer = await trainerService.updateTrainerByUserId(userId, updates);
        res.status(200).send(trainer);
    } catch (err) {
        res.status(400).send({ message: err.message });
    }
};

exports.deleteTrainer = async (req, res) => {
    try {
        const userId = req.auth.userId;
        await trainerService.deleteTrainerByUserId(userId);
        res.status(204).send();
    } catch (err) {
        res.status(400).send({ message: err.message });
    }
};




exports.markPokemon = async (req, res) => {
    try {
        const userId = req.auth.userId;
        const { pokemonId, isCaptured } = req.body;

        // console.log("isCaptured:", isCaptured);

        const pokemon = await pokemonService.getPokemonById(pokemonId);
        if (!pokemon) {
            return res.status(404).send({ message: "Pokémon non trouvé." });
        }

        const trainer = await trainerService.addPokemonToTrainer(userId, pokemonId, isCaptured);

        res.status(200).send(trainer);
    } catch (err) {
        console.error(err);
        res.status(400).send({ message: err.message });
    }
};
