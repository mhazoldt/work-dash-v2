let path = require('path')
// let logger = require('morgan')
let express = require("express")
let bodyParser = require("body-parser")
let apiRoutes = require('./routes/api')
let userRoutes = require('./routes/user')
let webRoutes = require('./routes/web')
let passportConfig = require('./config/passportConfig')
let mongo = require('mongodb')
let mongoose = require('mongoose')
let bcrypt = require('bcryptjs')
let expressValidator = require('express-validator')
let cors = require('cors')


mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/workDash2')
let db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function() {
  console.log('MONGOOSE CONNECTED')
})


var app = express()
app.use(passportConfig.passport.initialize())
app.use(express.static(path.join(__dirname, 'public')))
app.use(cors())

app.use(bodyParser.urlencoded({
  extended: true
}))


app.use(bodyParser.json())

/////////// routes

app.use('/api', apiRoutes)
app.use('/api/user', userRoutes)
app.use('/', webRoutes)


// no stacktraces leaked to user in production
app.use(function(err, req, res, next) {
  res.status(err.status || 500)
  res.json({
    message: err.message,
    error: app.get('env') === 'development' ? err : {}
  })
})


///////////// server

app.listen(process.env.PORT || 3001, function() {
  console.log("Express running")
})