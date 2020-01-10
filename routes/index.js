//Routing refers to determining how an application responds to a client request to a particular endpoint, which is a URI (or path) and a specific HTTP request method (GET, POST, and so on).
//Each route can have one or more handler functions, which are executed when the route is matched.

const express = require("express")

const router = express.Router()

router.get('/', function (req, res) {
    res.render('home', { title: 'UWBC' })
})

module.exports = router