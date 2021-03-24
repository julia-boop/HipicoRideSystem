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
    cEdit: async function(req, res){
        let hipico = await db.Hipico.findAll();
        let concurso = await db.Concurso.findByPk(req.params.idConcurso);
        return res.render('formConcursoEdit', {hipico, concurso})
    }, 
    cForm: function(req, res){
        db.Hipico.findAll()
        .then((hipico) => {
            res.render('formConcurso', {hipico})
        })
        .catch((e) => {
            res.send(e)
        })
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
            res.redirect('/concurso')
        })
        .catch((e) => {
            res.send(e)
        })
    }
}