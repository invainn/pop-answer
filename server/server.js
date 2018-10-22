require('dotenv').config();

const app = require('express')();
const mongoose = require('mongoose');
const cors = require('cors');

const port = 8080;
const { Game, User } = require('./models/Game');

app.use(cors());

app.get('/', (req, res, next) => {
    res.send('hello');
});

// TODO: Find better way to create new game
// Create the game 
app.post('/game/:gameid/user/:username', (req, res, next) => {
    let newGame = new Game({
        gameid: req.params.gameid,
        users: [new User({ username: 'Anthony', points: 0 })]
    });

    newGame.save()
    .then((doc) => {
        res.send(doc).status(200);
    })
    .catch(e => console.error(e));
});

// Add a new user into the game
app.put('/game/:gameid/user/:username', (req, res, next) => {
    Game.findOneAndUpdate(
    { gameid: req.params.gameid }, 
    { $push: { users: new User({ username: req.params.username, points: 0 }) } })
    .then((doc) => {
        res.send(doc).status(200);
    })
    .catch(e => console.error(e));
});

// TODO: Find out how to delete object from array (probably update and filter)
// Delete a user from game
app.delete('/game/:gameid/user/:username', (req, res, next) => {

});

// Finds a game 
app.get('/game/:gameid', (req, res, next) => {
     Game.findOne({
        gameid: req.params.gameid,
     })
     .then((doc) => {
        res.send(doc).status(200);
     })
     .catch(e => console.error(e));
});

// Update the game
app.put('/game/:gameid', (req, res, next) => {
    Game.findOneAndUpdate({
        gameid: req.params.gameid
    },
    { }
    )
    .then((doc) => {
        res.send(doc).status(200);
    })
    .catch(e => console.error(e));
});

// Delete a game
app.delete('/game/:gameid', (req, res, next) => {
    Game.findOneAndRemove({ gameid: req.params.gameid })
    .then((msg) => {
        res.send(`Deleted game ${req.params.gameid}`).status(200);
    })
    .catch(e => console.error(e));
});

// Create new connection to DB and if successful, start the server
mongoose.connect(
                    `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}`,
                    { useNewUrlParser: true },
                );

const db = mongoose.connection;
db.on('open', () => {
    console.log('Connected to DB!');

    app.listen(port, () => {
        console.log(`Now listening on: ${port}`);
    });
});

db.on('error', console.error.bind(console, 'connection error:'));
