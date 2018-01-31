let axios = require('axios');
var parseString = require('xml2js').parseString;

// endpoint: GET /api
// request: {}
// response: { message: "Express is up!" }
//           
//
// api index
function index(req, res) {
    res.json({ message: "Express is up!" })
}


// endpoint: GET /api
// request: {}
// response: { message: "Express is up!" }
//           
//
// api index
function search(req, res) {
    console.log('got to search')

    console.log(req.query)

    axios.get('https://stackoverflow.com/jobs/feed', {
        params: req.query
    })
        .then(function (response) {
            parseString(response.data, function (err, result) {
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.setHeader('Access-Control-Request-Method', '*');
                res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
                res.setHeader('Access-Control-Allow-Headers', '*');

                res.json(JSON.stringify(result))

            })

        })
        .catch(function (error) {
            console.log(error);
        });



}



module.exports = {
    index,
    search
}