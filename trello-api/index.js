const { urlencoded } = require('body-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const session = require('express-session');
const passport = require('./passport/setup');
const app = express();


const carteRouter = require('./router/carte');
const listeRouter = require('./router/liste');
const tableauRouter = require('./router/tableau');
const userRouter = require('./router/user');

app.use(cors());

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/api/tableaux', tableauRouter);
app.use('/api/listes', listeRouter);
app.use('/api/cartes', carteRouter);
app.use('/api/users', userRouter);

app.listen(process.env.PORT || 3300, () => {
    console.log('listening on port : 3000');
});