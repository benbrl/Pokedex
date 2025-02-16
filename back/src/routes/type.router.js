const express = require('express');
const router = express.Router();

const PokemonTypeController = require('../controllers/PkmnType.controller')


router.get('/pkmn/types', PokemonTypeController.getPokemonType );

// const UserController = require('../controllers/userController');
// const authM = require('../middlewares/auth.middleware');

// router.post('/', UserController.createUser);
// router.get('/checkUser', authM, UserController.CheckUser);
// router.get('/:id_or_email', authM, UserController.getUserByIDOrEmail); 


// router.put('/:id', UserController.updateUserById);
// router.delete('/:id', UserController.deleteUserById);

module.exports = router;