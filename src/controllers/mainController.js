const fetch = require('node-fetch')

module.exports = {
    home: function(req, res){
        res.render('home');
    }, 
    contact: function(req, res){
        res.render('contact')
    }
}
    
