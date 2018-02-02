var express = require('express')
var router = express.Router()
var path = require('path')

let webController = require('../controllers/webController')


router.get('/', webController.DEPLOY_REACT)


module.exports = router
