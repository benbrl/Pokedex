const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');

const typeRouter = require('./routes/type')


app.get('/', (req, res) => {
    res.send('Hello World!');
});


app.use('/api', typeRouter);


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

mongoose.connect('mongodb://admin:password@127.0.0.1:27017/td?authSource=admin')
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch((err) => console.error('Erreur de connexion MongoDB:', err));