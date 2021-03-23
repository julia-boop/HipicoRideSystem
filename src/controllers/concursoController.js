const db = require('../database/models');

module.exports = {
    read: function(req, res){
        db.Concurso.findAll({
            include: [
                {
                    association: 'Hipico',
                }
            ]
        })
        .then((concurso) => {
            res.render('concursos', {concurso});    
        })
        .catch((e) => {
            res.send(e)
        })
    },
    cDetail: function(req, res){
        res.render('detalleConcurso');
    }, 
    iForm: function(req, res){
        res.render('formInscripcion');
    }, 
    pDetail: function(req, res){
        res.render('detallePrueba')
    },
    pEdit: function(req, res){
        res.render('formPruebaEdit');
    },
    cEdit: function(req, res){
        res.render('formConcursoEdit');
    }, 
    cForm: function(req, res){
        res.render('formConcurso')
    },
    cCreate: function(req, res){
        db.Concurso.create({
            nombre: req.body.nombre, 
            fecha: req.body.fecha,
            anteprograma: req.body.programa,
            total_rec: null,
            hipico_id: req.body.hipico,
            pagado: null,
            estado: 1
        })
        .then((concurso)=> {
            res.render('concursos')
        })
        .catch((e) => {
            res.send(e)
        })
    }
}