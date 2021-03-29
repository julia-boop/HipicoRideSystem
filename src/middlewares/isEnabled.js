function isEnabled(req, res, next){
    if(req.session.habilitado == 1 || req.session.hipicoSession == undefined){
        res.redirect('/habilitacion')
    } else {
        console.log(req.session)
        next()
    }
}

module.exports = isEnabled;