const mongoose = require('mongoose');

const Done = new mongoose.Schema(
    {
        _id: String,
        content: mongoose.Schema.Types.Mixed,
    },
    {
        timestamps: true
    });

module.exports = mongoose.model('Done', Done);