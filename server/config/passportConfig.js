let passport = require("passport")
let jwt = require('jsonwebtoken')
let passportJWT = require("passport-jwt")
let ExtractJwt = passportJWT.ExtractJwt
let JwtStrategy = passportJWT.Strategy
let mongoose = require('mongoose')
// mongoose.Promise = require('bluebird');
let User = require('../models/user')


let jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeader()
jwtOptions.secretOrKey = 'keyboardcat'

let strategy = new JwtStrategy(jwtOptions, function (jwt_payload, next) {
    console.log('payload received', jwt_payload);

    User.getUserByUsername(jwt_payload.username, function (err, user) {
        if (user) {
            next(null, user)
        } else {
            next(null, false)
        }
    })

})

passport.use(strategy);


module.exports = {
    passport,
    jwtOptions,
    jwt
}