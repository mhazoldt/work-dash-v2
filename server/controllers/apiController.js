let axios = require('axios');
var parseString = require('xml2js').parseString;
let passportConfig = require('../config/passportConfig')
let JobPost = require('../models/jobPost')


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



// endpoint: POST /api/savejob
// request: {jobPost: jobPost}
// response: { message: "Job post saved." }
//
//
// api index
function saveJob(req, res) {
    let authHeader = req.headers.authorization
    let token = authHeader.substr(4)
    console.log(token)

    passportConfig.jwt.verify(token, passportConfig.jwtOptions.secretOrKey, function (err, decoded) {
        if (err) {
            console.log(err)
        }

        let username = decoded.username


        let jobPostReq = req.body.jobPost
        console.log('jobPostReq', jobPostReq)
        jobPostReq.username = username
        let newJobPost = new JobPost(jobPostReq)

        JobPost.create(newJobPost, results)

        function results(err, jobPost) {
            if (err) {
                console.log(err);


            } else {
                console.log(jobPost);

                let jsonRes = { "message": "Job post saved" }
                res.json(jsonRes)
            }


        }


    });
    console.log('------------ got to save job ---------------')



}


// endpoint: POST /api/savejob
// request: {jobPost: jobPost}
// response: { message: "Job post saved." }
//
//
// api index
function removeJobPost(req, res) {

    console.log('------------ got to remove job post ---------------')

    let authHeader = req.headers.authorization
    let token = authHeader.substr(4)
    console.log(token)

    passportConfig.jwt.verify(token, passportConfig.jwtOptions.secretOrKey, function (err, decoded) {
        if (err) {
            console.log(err)
        }

        let username = decoded.username

        console.log(req.body)

        JobPost.remove({ guid: req.body.guid, username: username }, results)

        function results(err, jobPost) {
            if (err) {
                console.log(err);

            } else {
                console.log(jobPost);

                let jsonRes = { "message": "Job post removed" }
                res.json(jsonRes)
            }


        }

    })


}

// endpoint: POST /api/savejob
// request: {jobPost: jobPost}
// response: { message: "Job post updated." }
//
//
// api index
function editJobPost(req, res) {

    console.log('------------ got to remove job post ---------------')

    let authHeader = req.headers.authorization
    let token = authHeader.substr(4)
    console.log(token)

    passportConfig.jwt.verify(token, passportConfig.jwtOptions.secretOrKey, function (err, decoded) {
        if (err) {
            console.log(err)
        }

        let data = {}

        let username = decoded.username

        data.query = {
            username: username,
            guid: req.body.jobPost.guid
        }

        data.options = {
            multi: true
        }

        data.newData = req.body.jobPost


        console.log(req.body)

        JobPost.edit(data, results)

        function results(err, jobPost) {
            if (err) {
                console.log(err);

            } else {
                console.log(jobPost);

                let jsonRes = { "message": "Job post updated" }
                res.json(jsonRes)
            }


        }

    })


}


// endpoint: POST /api/savejob
// request: {jobPost: jobPost}
// response: { message: "Job post saved." }
//
//
// api index
function listJobs(req, res) {
    let authHeader = req.headers.authorization
    let token = authHeader.substr(4)
    console.log(token)

    passportConfig.jwt.verify(token, passportConfig.jwtOptions.secretOrKey, function (err, decoded) {
        if (err) {
            console.log(err)
        }

        let username = decoded.username


        JobPost.getByUsername(username, results)

        function results(err, jobPosts) {
            if (err) {
                console.log(err)


            } else {
                console.log(jobPosts)

                let jsonRes = { "message": "Job posts", "data": jobPosts }
                res.json(jsonRes)
            }


        }


    })
    console.log('------------ got to list jobs ---------------')



}


module.exports = {
    index,
    search,
    saveJob,
    listJobs,
    removeJobPost,
    editJobPost
}