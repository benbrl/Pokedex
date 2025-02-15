class PokemonService {
    async createPokemon(fields) {
        return this.PokemonModel.create(fields);
    }

    async createRegion(fields) {
        const pokemon = await this.getPokemonById(fields.pokemonId);

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

    async updateRegionNumber(fields) {
        return await this.PokemonModel.updatePokemonById(fields.pokemonId, fields.regionId)
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
            { $set: updateFields }
        );
    }

    async deleteRegionById(id) {
        //A REVOIR DEMANDER PROF SI JE FAIS UN MODEL
        //Faire un service spécialisé ?
    }

}
module.exports = PokemonService;