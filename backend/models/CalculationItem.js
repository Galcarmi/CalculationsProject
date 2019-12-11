const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const eventSchema = new Schema({
  Number1: {
    type: Number,
    required: true
  },
  Number2: {
    type: Number,
    required: true
  },
  Sum: {
    type: Number,
    required: true
  },
  Multiplication: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('CalculationItem', eventSchema);
