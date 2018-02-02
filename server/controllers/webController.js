let path = require('path')



function DEPLOY_REACT(req, res) {
    
    res.sendFile(path.resolve(__dirname, '../public/index.html'))

}


module.exports = {
    DEPLOY_REACT
}