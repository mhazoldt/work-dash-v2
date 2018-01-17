var express = require('express');
let User = require('../models/user')

let passportConfig = require('../config/passportConfig')


// endpoint: GET /api
// request: {}
// response: { message: "Express is up!" }
//           
//
// api index
function index(req, res) {
    res.json({ message: "Express is up!" })
}


// endpoint: POST /api/register
// request: {}
// response: { "message": "user created" }
//           
//
// register new user
function register(req, res) {
    console.log("-- register user --")
    let username = req.body.username
    console.log({ username })
    let password = req.body.password

    let newUser = new User({
        username: username,
        password: password
    })

    User.createUser(newUser, result)

    function result(err, user) {
        if (err) {
            throw err;
        } else {
            console.log(user);
            let jsonRes = { "message": "user created" }
            res.json(jsonRes)
        }
    }

}



// endpoint: POST /api/login
// request: {username: username, password: password}
// response: { message: "ok", token: token }
//
//
// user login
function login(req, res) {
    var username = req.body.username
    var password = req.body.password


    User.getUserByUsername(username, result)

    function result(err, user) {
        if (err) throw err;
        if (user === null) {
            res.status(401).json({ message: "Unknown User" })
        } else {
            User.comparePassword(password, user.password, compareResult)
        }
    }

    function compareResult(err, isMatch) {
        if (err) throw err;
        if (isMatch) {
            var payload = { username: username };
            var token = passportConfig.jwt.sign(payload, passportConfig.jwtOptions.secretOrKey)
            res.json({ message: "ok", token: token })
        } else {
            res.status(401).json({ message: "Invalid password" })
        }
    }
}


//////////////////////////////////////////// auth routes


// endpoint: GET /api/secret
// request: {}
// response: { message: "Success! You can not see this without a token" }
//
//
// route authorization with jwt
function authRoute(req, res) {
    res.json({ message: "Success! You can not see this without a token" })
}


module.exports = {
    index,
    login,
    authRoute,
    register
}