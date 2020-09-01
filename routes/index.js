//Routing refers to determining how an application responds to a client request to a particular endpoint, which is a URI (or path) and a specific HTTP request method (GET, POST, and so on).
//Each route can have one or more handler functions, which are executed when the route is matched.

const express = require("express")
const JishoApi = require('unofficial-jisho-api')
const KuroshiroAPI = require('kuroshiro')
const KuromojiAnalyzer = require('kuroshiro-analyzer-kuromoji')
//const config = require('./node_modules/config'); what does this do?
const router = express.Router()
const jisho = new JishoApi();
const kuroshiro = new KuroshiroAPI();
const wanakana = require('wanakana');

const Quotes  = require('../models/Quotes')

kuroshiro.init(new KuromojiAnalyzer())

.then( () => {

router.get('/', function (req, res) { // This is the homepage
    res.render('home', { title: 'Japanese Dictionary' });
})

/*router.post('/', function (req, res){ // This takes care when someone searches, as a POST request is made
    res.redirect('/search?word=' + req.body.word); // Takes the res to the search function
}) */

router.get('/search', async function(req, res) { // Now, this goes to search

    if(req.query.newSearch){
        var data = {title: req.query.newSearch + ' - Japanese Dictionary', 
                    q: req.query.newSearch };

               /* res.render('search', 
        {title: req.query.word + ' - The Anime Dictionary', 
        q: req.query.word, 
        meaning: means
        }) */
       
    var japData = await jisho.searchForPhrase(req.query.newSearch); // a promise
    
    if (japData.meta.status === 200) { // Means data is extracted successfully
        if (japData.data[0]) { // Means data exists
            if (wanakana.isKana(req.query.newSearch)){
                data.hiragana = wanakana.toRomaji(req.query.newSearch);
                data.meaning = japData.data//[0].senses[0].english_definitions;
                res.render('search', data);
            } else {
                    data.hiragana = wanakana.toKana(req.query.newSearch);
                    data.meaning = japData.data//[0].senses[0].english_definitions;
                    res.render('search', data);
                }
        } else {
                data.hiragana = wanakana.toKana(req.query.newSearch);
                data.meaning = false;
                res.render('search', data);
            }
        }
    }
})})

.catch(err => console.log(err))

router.get('/upload', (req,res) => {
    res.render('upload', { title: 'Japanese Dictionary' });
});

router.post('/upload', (req, res) => {

    const {eng, jap} = req.body; //japanese and english sentences
    let errors = [];

    if (!eng || !jap ) {
        errors.push({msg: 'Please fill in both fields'});
    }

    if (errors.length > 0) {
        res.render('upload',{
            errors,
            eng,
            jap
        });
    }

    const newQuote  = new Quotes({
        eng, jap
    })
    newQuote.save()
        .then(user => {
            req.flash('Thank you for your submission!')
            res.render('upload', { title: 'Japanese Dictionary' });
        })
        .catch(err => console.log(err));
}); 

module.exports = router;