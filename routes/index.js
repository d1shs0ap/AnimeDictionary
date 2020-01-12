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

kuroshiro.init(new KuromojiAnalyzer()).then( () => {

router.get('/', function (req, res) {
    res.render('home', { title: 'The Anime Dictionary' })
})

router.post('/', function (req, res){
    res.redirect('/search?word=' + req.body.word)
})

router.get('/search', async function(req, res) {
    if(req.query.word){
        var style = {title: req.query.word + ' - The Anime Dictionary', 
                    q: req.query.word };
        // 
       
    var japData = await jisho.searchForPhrase(req.query.word);
                if (japData.data[0]) {
                    if (wanakana.isKana(req.query.word)){
                        style.hiragana = wanakana.toRomaji(req.query.word);
                style.meaning = japData.data//[0].senses[0].english_definitions;
                res.render('search', style);
                    } else {
                style.hiragana = wanakana.toKana(req.query.word);
                style.meaning = japData.data//[0].senses[0].english_definitions;
                res.render('search', style);
                    }
                } else {
                    style.hiragana = wanakana.toKana(req.query.word);
                    style.meaning = false;
                    res.render('search', style);
                }
            
            
        
    
    
    
       /* res.render('search', 
        {title: req.query.word + ' - The Anime Dictionary', 
        q: req.query.word, 
        meaning: means
        }) */
    }
})})

module.exports = router