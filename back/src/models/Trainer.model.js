const mongoose = require("mongoose");

let validateUrl = function (UrlImage) {
    const re = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gi;
    return re.test(UrlImage);
};

const TrainerSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    trainerName: { type: String, required: true },
    imgUrl: {
        type: String,
        required: true,
        validate: [validateUrl, "URL invalide. Utilisez une URL d'image valide."]
    },
    creationDate: { type: Date, default: Date.now },
    pkmnSeen: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Pokemon' }],
    pkmnCatch: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Pokemon' }]
});

const Trainer = mongoose.model('Trainer', TrainerSchema);

module.exports = Trainer;