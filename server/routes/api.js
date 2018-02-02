let express = require('express')
let router = express.Router()

let passportConfig = require('../config/passportConfig')
let apiController = require('../controllers/apiController')


router.get("/", apiController.index)
router.get("/search", apiController.search)
router.post("/savejob", passportConfig.passport.authenticate('jwt', { session: false }), apiController.saveJob)
router.post("/removejobpost", passportConfig.passport.authenticate('jwt', { session: false }), apiController.removeJobPost)
router.post("/editjobpost", passportConfig.passport.authenticate('jwt', { session: false }), apiController.editJobPost)
router.get("/listjobs", passportConfig.passport.authenticate('jwt', { session: false }), apiController.listJobs)


module.exports = router