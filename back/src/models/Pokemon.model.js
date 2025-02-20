const mongoose = require("mongoose");

let validateUrl = function (UrlImage) {
    const re = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gi;
    return re.test(UrlImage);
}

const pokemonSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    types: { type: [String], required: true },
    description: { type: String, required: false },
    regions: { 
        type: [{ 
            regionName: { type: String, required: true },
            regionPokedexNumber: { type: Number, required: true }
        }],
        required: false
    },
    imgUrl: { 
        type: String, 
        required: true,
        validate: [validateUrl, "URL invalide. Utilisez une URL d'image valide."]
    },
    soundUrl: {
        type: String, 
 
        validate: [validateUrl, "URL invalide. Utilisez une URL d'image valide."]
    },
    height:{
        type: String
    },
    weight: {
        type: String
    },

});

const pokemonModel = mongoose.model("Pokemon", pokemonSchema);

module.exports = pokemonModel;
