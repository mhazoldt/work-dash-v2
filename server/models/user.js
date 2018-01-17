let bcrypt = require('bcryptjs')
let mongoose = require('mongoose')


let UserSchema = mongoose.Schema({
    username: {
        type: "string",
        index: "true",

    },
    password: {
        type: "string"
    }
})

let User = mongoose.model('User', UserSchema)


User.createUser = (newUser, callback) => {
    bcrypt.genSalt(10, bcryptHash)

    function bcryptHash(err, salt) {
        bcrypt.hash(newUser.password, salt, newUserSave)
    }

    function newUserSave(err, hash) {
        newUser.password = hash
        newUser.save(callback)
    }
}

User.getUserByUsername = (username, callback) => {
    let query = { username: username }
    User.findOne(query, callback)
}

User.comparePassword = (candidatePassword, hash, callback) => {

    bcrypt.compare(candidatePassword, hash, result)

    function result(err, isMatch) {
        if (err) throw err
        callback(null, isMatch)
    }

}


module.exports = User