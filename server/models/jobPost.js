let mongoose = require('mongoose')


let JobPostSchema = mongoose.Schema({
    username: {
        type: "string"
    },
    updated: {
        type: "string"
    },
    author: {
        type: []
    },
    category: {
        type: []
    },
    description: {
        type: []
    },
    guid: {
        type: "string"
    },
    title: {
        type: "string"
    },
    postDate: {
        type: "string"
    },
    location: {
        type: "string"
    },
    applied: {
        type: Boolean
    },
    response: {
        type: Boolean
    },
    interviewed: {
        type: Boolean
    },
    notes: {
        type: "string"
    }
})

let JobPost = mongoose.model('JobPost', JobPostSchema)


JobPost.create = (newJobPost, callback) => {
    newJobPost.save(callback)
}

JobPost.getByUsername = (username, callback) => {
    let query = { username: username }
    JobPost.find(query, callback)
}

JobPost.delete = (data, callback) => {
    let query = { guid: data.guid, username: data.username }
    JobPost.remove(query, callback)
}

JobPost.edit = (data, callback) => {
    JobPost.update(data.query, data.newData, data.options, callback)
    
}


module.exports = JobPost