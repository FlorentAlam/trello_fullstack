const bcrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const knex = require('../database');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    let user = await knex.where({id}).select().table('users');
    done(err, user);
});

passport.use(new LocalStrategy({ usernameField: "email"}, async (email, password, done) => {
    let user = await knex.where({email}).select().table('users');
    if(!user.length){
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, async (err, hash) => {
                if(err) throw err;
                let user_id = await knex('users').insert({email, password: hash});
                return done(null, user_id);
            })
        })
    } else {
        bcrypt.compare(password, user[0].password, (err, isMatch) => {
            if(err) throw err;
            if(isMatch){
                return done(null, user[0]);
            } else {
                return done(null, false, {message: "wrong password"});
            }
        })
    }

}));

module.exports = passport;