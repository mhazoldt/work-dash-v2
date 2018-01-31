let express = require('express')
let router = express.Router()

let passportConfig = require('../config/passportConfig')
let apiController = require('../controllers/apiController')


router.get("/", apiController.index)
router.get("/search", apiController.search)


module.exports = router

