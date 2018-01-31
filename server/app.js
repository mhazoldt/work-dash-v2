let path = require('path')
// let logger = require('morgan')
let express = require("express")
let bodyParser = require("body-parser")
let apiRoutes = require('./routes/api')
let userRoutes = require('./routes/user')
let webRoutes = require('./routes/web')
let passportConfig = require('./config/passportConfig')
let flash = require('connect-flash')
let mongo = require('mongodb')
let mongoose = require('mongoose')
let bcrypt = require('bcryptjs')
let expressValidator = require('express-validator')
let cors = require('cors')

mongoose.connect('mongodb://localhost/workDash2')
let db = mongoose.connection


db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function() {
  console.log('MONGOOSE CONNECTED')
})



var app = express()
app.use(passportConfig.passport.initialize())

app.use(cors())

app.use(bodyParser.urlencoded({
  extended: true
}))


app.use(bodyParser.json())

/////////// routes

app.use('/api', apiRoutes)
app.use('/api/user', userRoutes)
app.use('/', webRoutes)

///////////// server

app.listen(3001, function() {
  console.log("Express running")
})