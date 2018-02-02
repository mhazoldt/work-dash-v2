let express = require('express');
let User = require('../models/user')
let Incrementor = require('../models/incrementor')

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
// request: { username: "username", password: "password" }
// response: { "message": "user created" }
//           
//
// register new user
function register(req, res) {


    let incrementorExists = shouldCreateIncrementor('users')
    console.log("-- incrementor exists --", incrementorExists)
    if (incrementorExists === false || incrementorExists === undefined ) {
        console.log("trying to create incrementor")
        let newIncrementor = new Incrementor({
            collection_name: 'users',
            last_id: 0
        })

        Incrementor.createIncrementor(newIncrementor, getNextId)
        console.log('INCREMENTOR CREATED')
    } else {
        console.log("trying to get next id for user")
        getNextId()
    }

    function getNextId() {
        Incrementor.getNextId('users', registerUser)
    }

    function registerUser(nextId) {
        console.log("-- register user --")
        console.log(req)
        console.log("###### REQUEST BODY #######")
        console.log(req.body)
        console.log("###### REQUEST BODY USERNAME #######")
        console.log(req.body['username'])
        let username = req.body.username
        console.log({ username })
        let password = req.body.password
        let user_id = nextId
        console.log({ user_id })

        let newUser = new User({
            user_id: user_id,
            username: username,
            password: password
        })

        User.createUser(newUser, result)
    }

    function result(err, user) {
        if (err) {
            console.log(err);
            if (err.code === 11000) {
                res.json({ "message": "duplicate username" })
            } else {
                throw err
            }

        } else {
            console.log(user);
            Incrementor.increment('users', (doc) => { console.log(doc) })



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

    console.log("got to login")

    User.getUserByUsername(username, result)

    function result(err, user) {
        if (err) throw err;
        if (user === null) {
            // res.status(401).json({ message: "Unknown User" })
            res.json({ message: "Unknown User" })
        } else {
            User.comparePassword(password, user.password, compareResult)
        }
    }

    function compareResult(err, isMatch) {
        if (err) throw err;
        if (isMatch) {
            var payload = { username: username };
            var token = passportConfig.jwt.sign(payload, passportConfig.jwtOptions.secretOrKey)
            res.json({ message: "ok", token: token, authUsername: username })
        } else {
            res.status(401).json({ message: "Invalid password" })
        }
    }
}



// endpoint: GET /api/secret
// request: {}
// response: { message: "Success! You can not see this without a token" }
//
//
// route authorization with jwt
function counterRoute(req, res) {

    let newIncrementor = new Incrementor({
        collection_name: 'users',
        last_id: 0
    })

    Incrementor.createIncrementor(newIncrementor, nextStep)

    function nextStep(err, user) {
        if (err) {
            throw err;
        } else {
            console.log(user);
            // let jsonRes = { "message": "incrementor created" }
            // res.json(jsonRes)
            tryIncrement()
        }
    }

    function tryIncrement() {

        Incrementor.increment('users', results)

    }

    function results(dc) {
        // let jsonRes = { "message": "incrementor created" }
        res.json(dc)
    }

}


// endpoint: GET /api/secret
// request: {}
// response: { message: "Success! You can not see this without a token" }
//
//
// route authorization with jwt
function shouldCreateIncrementor(collection_name) {

    Incrementor.containsDocument(collection_name, results)

    function results(err, documentExists) {
        if (err) {
            console.log('ERROR HAPPENED HERE')
            throw err;
        } else {
            console.log(documentExists);
            return documentExists
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