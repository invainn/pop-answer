const mongoose = require('mongoose');

let UserSchema = new mongoose.Schema({
    username: String,
    points: Number,
});

let GameSchema = new mongoose.Schema({
    gameid: { type: String, required: true, unique: true },
    users: [UserSchema],
});

module.exports = {
    Game: mongoose.model('Game', GameSchema),
    User: mongoose.model('User', UserSchema),
}