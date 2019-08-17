const mongoose = require('mongoose');

const Shared = new mongoose.Schema(
    {
        _id: String,
        content: mongoose.Schema.Types.Mixed,
    },
    {
        timestamps: true
    });

module.exports = mongoose.model('Shared', Shared);