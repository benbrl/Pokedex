class PokemonService {
    constructor() {
        this.PokemonTypeModel = require('../models/PkmnType.model');
        this.PokemonModel = require('../models/Pokemon.model');
        this.bcrypt = require('../../node_modules/bcrypt');
    }

    async createPokemon(fields) {
        return this.PokemonModel.create(fields);
    }

    async createRegion(fields) {
        const pokemon = await this.getPokemonById(fields.pokemonId);

        // console.log(pokemon);

         if (!pokemon) throw new Error("Le Pokémon n'existe pas.");

        const existingRegion = pokemon.regions.find(r => r.regionName === fields.region);

        console.log(pokemon)
        if (existingRegion) {
            existingRegion.regionPokedexNumber = fields.regionId;
        } else {
            pokemon.regions.push({
                regionName: fields.region,
                regionPokedexNumber: fields.regionId
            });
        }

        await pokemon.save();
        return pokemon;
    }

    async updateRegion(pokemonId, regionData) {
        const pokemon = await this.getPokemonById(pokemonId);
        if (!pokemon) throw new Error("Le Pokémon n'existe pas.");
    
        let existingRegion = pokemon.regions.find(r => r.regionName === regionData.regionName);
    
        if (existingRegion) {
            existingRegion.regionPokedexNumber = regionData.regionPokedexNumber;
        } else {
            pokemon.regions.push({
                regionName: regionData.regionName,
                regionPokedexNumber: regionData.regionPokedexNumber
            });
        }
    
        await pokemon.save();
        return pokemon;
    }
    


    async updateRegionNumber(fields) {
        return await this.PokemonModel.updatePokemonById(fields.pokemonId, fields.regionId)
    }

    async updateRegionName(fields) {
        return await this.PokemonModel.updatePokemonById(fields.pokemonId, fields.regionName)
    }

    async getPokemonById(id) {
        return this.PokemonModel.findById(id);
    }

    async getPokemonByName(name) {
        return this.PokemonModel.findOne({ name: name });
    }

    async deletePokemonById(id) {
        return this.PokemonModel.deleteOne({ _id: id });
    }

    async updatePokemonById(id, updateFields) {
        return this.PokemonModel.updateOne(
            { _id: id },
            { $set: updateFields },
            { new: true }
        );
    }

    async deleteRegionById(pokemonId, regionName) {
        if (!regionName || !pokemonId) {
            throw new Error("Les paramètres regionName et pokemonId sont obligatoires.");
        }

        let pokemon = await this.getPokemonById(pokemonId);
        if (!pokemon) {
            throw new Error("Le Pokémon n'existe pas.");
        }

        const initialLength = pokemon.regions.length;
        pokemon.regions = pokemon.regions.filter(region => region.regionName !== regionName);

        if (pokemon.regions.length === initialLength) {
            throw new Error("La région spécifiée n'a pas été trouvée pour ce Pokémon.");
        }

        await pokemon.save();
        return pokemon;
    }


    async searchPokemons({ page = 1, size = 20, typeOne, typeTwo, partialName }) {
        const filters = {};
    
        if (typeOne) filters.types = typeOne;
        if (typeTwo) filters.types = { $all: [typeOne, typeTwo] };
        if (partialName) filters.name = { $regex: partialName, $options: "i" };
    
        console.log("Filters applied:", filters); // Ajoutez ce log pour vérifier les filtres
    
        const skip = (page - 1) * size;
        const pokemons = await this.PokemonModel.find(filters).skip(skip).limit(parseInt(size));
        const count = await this.PokemonModel.countDocuments(filters);
    
        console.log("Pokemons found:", pokemons); // Ajoutez ce log pour vérifier les résultats
    
        return { data: pokemons, count };
    }
    


}
module.exports = PokemonService;