//Routing refers to determining how an application responds to a client request to a particular endpoint, which is a URI (or path) and a specific HTTP request method (GET, POST, and so on).
//Each route can have one or more handler functions, which are executed when the route is matched.

const express = require("express")
const JishoApi = require('unofficial-jisho-api')

const router = express.Router()
const jisho = new JishoApi();

router.get('/', function (req, res) {
    res.render('home', { title: 'The Anime Dictionary' })
})

router.post('/', function (req, res){
    res.redirect('/search?word=' + req.body.word)
})

router.get('/search', function(req, res) {
    if(req.query.word){
       
    jisho.searchForKanji(req.query.word).then(result => {  
        console.log("here------" + result.meaning)
        
        res.render('search', 
        {title: req.query.word + ' - The Anime Dictionary', 
        q: req.query.word, 
        meaning: result.meaning
        })});
       /* res.render('search', 
        {title: req.query.word + ' - The Anime Dictionary', 
        q: req.query.word, 
        meaning: means
        }) */
    }
})

module.exports = router