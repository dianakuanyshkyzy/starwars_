const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlanetSchema = new Schema({
  name: String,
  rotation_period: String,
  orbital_period: String,
  diameter: String,
  climate: String,
  gravity: String,
  terrain: String,
  surface_water: String,
  population: String,
  residents: [String],
  films: [String],
});

module.exports = mongoose.model('Planet', PlanetSchema);
