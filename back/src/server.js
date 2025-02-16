const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
const MiddleWare = require('./middlewares/perm.middleware')
const typeRouter = require('./routes/type.router');
const authRouter = require('./routes/auth.router');
const pokemonRouter = require('./routes/pokemon.router');

// Dans votre server.js
// Parse URL-encoded bodies (Envoyé par les HTML forms)
// Body x-www-url-encoded
app.use(express.urlencoded({ extended: true }));
// Parse JSON bodies (Envoyé par les clients API)
// Body Raw format JSON
app.use(express.json());
// Cela popule le req.body avec les infos envoyé



app.get('/users', )



// app.get('/', (req, res) => {
//     res.send('Hello World!');
// });


app.use('/api', typeRouter);
app.use('/api', pokemonRouter);
app.use('/auth', authRouter);


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

mongoose.connect('mongodb://admin:password@127.0.0.1:27017/pokedex?authSource=admin')
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch((err) => console.error('Erreur de connexion MongoDB:', err));