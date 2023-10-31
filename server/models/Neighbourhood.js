const mongoose = require('mongoose');

const neighbourhoodSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    centerlat: {
        type: Number,
        required: true
    },
    centerlng: {
        type: Number,
        required: true
    },
    borderPoints: {
        type: Array,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    },
});

const Neighbourhood = mongoose.model('Neighbourhood', neighbourhoodSchema);

module.exports = Neighbourhood;