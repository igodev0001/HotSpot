const mongoose = require('mongoose');

const popularTimeSchema = new mongoose.Schema({
  day_id: {
    type:Number,
    required:true
  },
  hour_id:{
    type:Number,
    required: true
  },
  busy_value: {
    type:Number,
    required:true
  },
  hot_score: {
    type:Number,
    required:true
  },
  created_at: { 
    type: Date, 
    default: Date.now 
  },
  updated_at: { 
    type: Date, 
    default: Date.now 
  },
  place_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Place' 
  }
});

const PopularTime = mongoose.model('PopularTime', popularTimeSchema);

module.exports = PopularTime;