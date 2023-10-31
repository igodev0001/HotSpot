const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  neighbourhood_id: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Neighbourhood' 
  },
  address: {
    type: String,
    required: true
  },
  lat: {
    type: Number,
    required: true
  },
  lng: {
    type: Number,
    required: true
  },
  rating: {
    type: Number,
    required: true
  },
  rating_n: {
    type: Number,
    required: true
  },
  phone_number: {
    type: String,
    required: true
  },
  current_popularity: {
    type: Number,
    required: true
  },
  time_spent_min: {
    type: Number,
    required: true
  },
  time_spent_max: {
    type: Number,
    required: true
  },
  postal_code: {
    type: String,
    required: true
  },
  google_price_level: {
    type: Number,
    required: true
  },
  yelp_id: {
    type: String,
    required: true
  },
  yelp_url: {
    type: String,
    required: true
  },
  yelp_phone: {
    type: String,
    required: true
  },
  yelp_display_phone: {
    type: String,
    required: true
  },
  yelp_review_count: {
    type: Number,
    required: true
  },
  yelp_rating: {
    type: Number,
    required: true
  },
  yelp_price: {
    type: String,
    required: true
  },
  yelp_categories: {
    type:Array,
    required: true
  },
  yelp_photos: {
    type:Array,
    required:true
  },
  created_at: { 
    type: Date, 
    default: Date.now 
  },
  updated_at: {
     type: Date,
     default: Date.now
  }
});

const Place = mongoose.model('Place', placeSchema);

module.exports = Place;