const mongoose = require('mongoose');
// optional shortcut to the mongoose.Schema class
const Schema = mongoose.Schema;

const planetSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    diameter: Number,
    distance: Number,
    facts: [String],
    state: {
        type: String,
        enum: ['Solid', 'Gas']
    },
    moons: [{
        type: Schema.Types.ObjectId,
        ref: "Moon"
    }]
});

module.exports = mongoose.model("Planet", planetSchema);