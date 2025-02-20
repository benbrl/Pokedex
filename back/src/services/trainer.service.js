const Trainer = require('../models/Trainer.model');
const UserService = require('../services/user.service');

class TrainerService {
    constructor() {
        this.userService = new UserService();
    }

    async createTrainer(userId, trainerName, imgUrl) {
        const user = await this.userService.getUserByID(userId);
        if (!user) {
            throw new Error("Utilisateur non trouvé");
        }

        const existingTrainer = await Trainer.findOne({ userId });
        if (existingTrainer) {
            throw new Error("Un dresseur existe déjà pour cet utilisateur");
        }

        const newTrainer = new Trainer({ userId, trainerName, imgUrl, username: user.username });
        await newTrainer.save();
        return newTrainer;
    }

    async getTrainerByUserId(userId) {
        const user = await this.userService.getUserByID(userId);
        if (!user) {
            throw new Error("Utilisateur non trouvé");
        }

        const trainer = await Trainer.findOne({ username: user.username }).populate('pkmnSeen pkmnCatch');
        if (!trainer) {
            throw new Error("Dresseur non trouvé");
        }
        return trainer;
    }

    async updateTrainerByUserId(userId, updates) {
        const user = await this.userService.getUserByID(userId);
        if (!user) {
            throw new Error("Utilisateur non trouvé.");
        }

        const trainer = await Trainer.findOneAndUpdate({ username: user.username }, updates, { new: true });
        if (!trainer) {
            throw new Error("Dresseur non trouvé.");
        }
        return trainer;
    }

    async deleteTrainerByUserId(userId) {
        const user = await this.userService.getUserByID(userId);

        if (!user) {
            throw new Error("Utilisateur non trouvé.");
        }

        const trainer = await Trainer.findOneAndDelete({ username: user.username });
        if (!trainer) {
            throw new Error("Dresseur non trouvé.");
        }
        return trainer;
    }

   
    async addPokemonToTrainer(userId, pokemonId, isCaptured) {
        const user = await this.userService.getUserByID(userId);
        if (!user) {
            throw new Error("Utilisateur non trouvé.");
        }

        let trainer = await Trainer.findOne({ username: user.username });
        if (!trainer) {
            throw new Error("Cet utilisateur n'a pas de trainer");
        }

        let isAlreadySeen = trainer.pkmnSeen.find((p) => p == pokemonId)
            ? true
            : false;

        let isAlreadyCatched = trainer.pkmnCatch.find((p) => p == pokemonId)
            ? true
            : false;

        if (isCaptured === "false") {
            if (isAlreadySeen) {
                throw new Error("Ce pokémon a déjà été vu");
            }

            trainer = await Trainer.findOneAndUpdate(
                { username: user.username },
                { $push: { pkmnSeen: pokemonId } },
                { new: true }
            );
        } else {
            if (isAlreadyCatched) {
                throw new Error("Ce pokémon a déjà été capturé");
            }

            const updateFields = isAlreadySeen
                ? { $push: { pkmnCatch: pokemonId } }
                : { $push: { pkmnSeen: pokemonId, pkmnCatch: pokemonId } };

            trainer = await Trainer.findOneAndUpdate(
                { username: user.username },
                updateFields,
                { new: true }
            );
        }

        return trainer;
    }




}

module.exports = TrainerService;
