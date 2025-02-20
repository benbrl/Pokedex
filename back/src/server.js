const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
const MiddleWare = require('./middlewares/perm.middleware')
const typeRouter = require('./routes/type.router');
const authRouter = require('./routes/auth.router');
const pokemonRouter = require('./routes/pokemon.router');
const trainerRouter = require('./routes/trainer.routes');
var cors = require('cors')

app.use(cors({
  origin: 'http://localhost:5173', // Allow requests from this origin
  methods: 'GET,POST,PUT,PATCH,DELETE', // Allow specific methods
  credentials: true // Allow cookies to be sent
}));

// Dans votre server.js
// Parse URL-encoded bodies (Envoyé par les HTML forms)
// Body x-www-url-encoded
app.use(express.urlencoded({ extended: true }));
// Parse JSON bodies (Envoyé par les clients API)
// Body Raw format JSON
app.use(express.json());
// Cela popule le req.body avec les infos envoyé



app.get('/users', )


app.use('/api', typeRouter);
app.use('/api', pokemonRouter);
app.use('/auth', authRouter);
app.use('/trainer', trainerRouter);


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

mongoose.connect('mongodb://admin:password@127.0.0.1:27017/pokedex?authSource=admin')
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch((err) => console.error('Erreur de connexion MongoDB:', err));