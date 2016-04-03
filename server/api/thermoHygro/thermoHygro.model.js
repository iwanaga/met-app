'use strict';

import mongoose from 'mongoose';

var ThermoHygroSchema = new mongoose.Schema({
  temperature: Number,
  humidity: Number,
  heatIndex: Number
}, {
  timestamps: true,
  capped: 4000000000
}).index({
  createdAt: 1
});

export default mongoose.model('ThermoHygro', ThermoHygroSchema);
