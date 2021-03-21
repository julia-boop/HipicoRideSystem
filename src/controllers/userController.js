const db = require('../database/models');
const bcrypt = require('bcryptjs');


module.exports = {
    login: function(req, res){
        res.render('login');
    },
    enter: function(req, res){
        db.Usuario.findOne({
            where: {
                email: req.body.email
            }
        })
        .then(function(usuario){
            if(bcrypt.compareSync(req.body.contrasena, usuario.contrasena)){
                req.session.userSession = usuario.id
                res.redirect('/')
            }else{
                res.render('login')
            }
        })
        .catch(function(e){
            res.send(e)
        })
    }, 
    register: function(req, res){
        res.render('register');
    }, 
    saveUser: function(req, res){
        db.Usuario.create({
          email: req.body.email,
          rol: 1,
          contrasena: bcrypt.hashSync(req.body.contrasena, 10),
          nombre: req.body.nombre,
          apellido: req.body.apellido,
          telefono: req.body.telefono,
          pais: null 
        })
        .then(function(usuario){
            res.render('home')
        })
        .catch(function(e){
            res.send(e)
        })
    },
    account: function(req, res){
        db.Usuario.findByPk(req.params.idUser)
        .then(function(usuario){
            res.render('cuenta', {usuario});
        })
        .catch(function(e){
            res.send(e)
        })
    }, 
    accountEdit: function(req, res){
        db.Usuario.findByPk(req.params.idUser)
        .then(function(usuario){
            res.render('accountEdit', {usuario});
        })
        .catch(function(e){
            res.send(e)
        })
    },
    update: function(req, res){
        db.Usuario.update({
            email: req.body.email,
            rol: 1,
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            telefono: req.body.telefono,
        }, {
            where: {
                id: req.params.idUser
            }
        })
        .then(function(usuario){
            res.redirect('/user/' + req.params.idUser + '/account')
        })
        .catch(function(e){
            res.send(e)
        })
    },
    inscripciones: function(req, res){
        res.render('misInscripciones');
    },
    logout: function(req, res){
        req.session.destroy()
        res.redirect('/')
    }
}