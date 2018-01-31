

// endpoint: GET /
// request: {}
// response: { message: "Express is up!" }
//           
//
// web index
function index(req, res) {
    res.json({ message: "Express is up!" })
}


module.exports = {
    index
}