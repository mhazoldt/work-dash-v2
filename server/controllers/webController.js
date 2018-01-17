// var path = require('path')
// var express = require('express')


function index(req, res) {
    res.json({ message: "Express is up!" })
}


module.exports = {
    index
}