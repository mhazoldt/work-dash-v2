let express = require('express')
let router = express.Router()

let passportConfig = require('../config/passportConfig')
let usersController = require('../controllers/usersController')


router.get("/", usersController.index)

router.post("/register", usersController.register)

router.post("/login", usersController.login)

router.get("/secret", passportConfig.passport.authenticate('jwt', { session: false }), usersController.authRoute)


module.exports = router