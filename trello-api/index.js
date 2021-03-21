const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const session = require('express-session');
const app = express();


const carteRouter = require('./router/carte');
const listeRouter = require('./router/liste');
const tableauRouter = require('./router/tableau');
const userRouter = require('./router/user');
const secret = require('./secret');

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(session({
    secret: secret.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    secure: false
}));

app.use('/api/tableaux', tableauRouter);
app.use('/api/listes', listeRouter);
app.use('/api/cartes', carteRouter);
app.use('/api/users', userRouter);

app.listen(process.env.PORT || 3300, () => {
    console.log('listening on port : 3000');
});