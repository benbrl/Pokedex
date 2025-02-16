const express = require('express');
const router = express.Router();

const PokemonController = require('../controllers/pokemon.controller')


router.get('/pkmn/:id_or_name', PokemonController.getPokemon);

router.get('/pkmn/search/:data', PokemonController.searchPokemons);
router.post('/pkmn', PokemonController.addPokemon)
router.delete('/pkmn/:id', PokemonController.deletePokemon);
router.put('/pkmn/region', PokemonController.addRegion);
router.put('/pkmn/:id', PokemonController.updatePokemon);


router.delete('/pkmn/region/:id', PokemonController.deleteRegion);



module.exports = router;


