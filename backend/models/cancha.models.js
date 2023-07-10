const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CanchaSchema = new Schema({
  descripcion: String
});

const CanchaModel = mongoose.model('Cancha', CanchaSchema);

module.exports = CanchaModel;