let express = require('express')
let router = express.Router()

let passportConfig = require('../config/passportConfig')
let apiController = require('../controllers/apiController')


router.get("/", apiController.index)

router.post("/register", apiController.register)

router.post("/login", apiController.login)

router.get("/secret", passportConfig.passport.authenticate('jwt', { session: false }), apiController.authRoute)


module.exports = router

