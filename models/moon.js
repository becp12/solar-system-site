const mongoose = require('mongoose');
// optional shortcut to the mongoose.Schema class
const Schema = mongoose.Schema;

const moonSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    history: String,
    diameter: Number,
    planet: String
});

module.exports = mongoose.model("Moon", moonSchema);