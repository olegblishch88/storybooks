const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');

//Load user model
require('./models/User');

//Passport config
require('./config/passport')(passport);

//Load keys
const keys = require('./config/keys');

//Map global promises
mongoose.Promise = global.Promise;

//Mongoose connect
mongoose.connect(keys.mongoURI, {
    useNewUrlParser: true
})
    .then(() => console.log('MongoDB connected!'))
    .catch(err => console.log(err));

//Load routes
const auth = require('./routes/auth');

const app = express();

app.get('/', (req, res) => {
    res.send('index')
});

//Use Routes
app.use('/auth', auth);

const port = process.env.PORT || 5000;
app.listen(port, console.log(`Server listening on port ${port}`));