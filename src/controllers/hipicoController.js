const db = require('../database/models');

module.exports = {
    login: (req, res) => {
        res.render('hipicoLogin')
    },
    enter: (req, res) => {
        db.Hipico.findOne( {
            where: {
                mail: req.body.email
            }
        })
        .then((hipico) => {
            res.send(hipico)
        })
        .catch((e) => {
            res.send(e)
        })
    }
}