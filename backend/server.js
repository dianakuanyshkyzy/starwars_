const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const path = require('path');
const Planet = require('./models/Planet');
const planetRoutes = require('./routes/planetRoutes');
const app = express();
const PORT = process.env.PORT || 5000;

mongoose.connect('mongodb://localhost/star-wars')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.use(express.json());

app.use('/api', planetRoutes);

const fetchAndStorePlanets = async () => {
  try {
    const response = await axios.get('https://swapi.dev/api/planets/');
    const planets = response.data.results;
    planets.forEach(async planet => {
      const newPlanet = new Planet(planet);
      await newPlanet.save();
    });
    console.log('Planets data fetched and stored in MongoDB');
  } catch (error) {
    console.error('Error fetching planets data:', error);
  }
};

fetchAndStorePlanets();

app.use(express.static(path.join(__dirname, 'client/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build/index.html'));
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
