const db = require('../database/models');
const bcrypt = require('bcryptjs');

module.exports = {
    register: (req, res) => {
        res.render('hipicoRegister')
    },
    save: (req, res) => {
        db.Hipico.create({
            nombre: req.body.nombre,
            siglas: req.body.siglas,
            logo: (req.files[0] == undefined) ? 'default.jpeg' : req.files[0].filename,
            direccion: req.body.direccion,
            mail: req.body.mail,
            contrasena: bcrypt.hashSync(req.body.contrasena, 12),
            habilitado: 1
        })
        .then((hipico) => {
            req.session.hipicoSession = hipico.id
            req.session.habilitado = hipico.habilitado
            res.redirect('/')
        })
        .catch((e) => {
            res.send(e)
        })
    },
    login: (req, res) => {
        res.render('hipicoLogin')
    },
    enter: (req, res) => {
        db.Hipico.findOne({
            where: {
                mail: req.body.mail
            }
        })
        .then((hipico) => {
            if(hipico){
                if(bcrypt.compareSync(req.body.contrasena, hipico.contrasena)){
                    req.session.hipicoSession = hipico.id
                    req.session.habilitado = hipico.habilitado
                    console.log(req.session)
                    res.redirect('/')
                }else{
                    res.render('hipicoLogin')
                }
            }else{
                res.render('hipicoLogin')
            }
        })
        .catch((e) => {
            res.send(e)
        })
    },
    account: async (req, res) => {
        let hipico = await db.Hipico.findByPk(req.params.idHipico)
        let concursos = await db.Concurso.findAll({
            where: {
                hipico_id: req.params.idHipico
            }
        })
        let pruebas = []
        for(let i = 0 ; i < concursos.length ; i ++){
            pruebas.push(await db.Prueba.findAll({
                include: [{association:'Concurso'}],
                where: {
                    concurso_id: concursos[i].id
                }
            }))
        }
        let gananciaActual = null
        for(let i = 0 ; i < pruebas.length ; i ++){
            if(pruebas[i].Concurso.estado == 1){
                gananciaActual+=Number(pruebas[i].anotados*pruebas[i].precio)
            }
        }
        console.log(gananciaActual)

        
        
        return res.send(pruebas)
        // return res.send(concursos)
        return res.render('panelHipico', {hipico});
        
        
    },
    update: async (req, res) => {
        let hFound = await db.Hipico.findByPk(req.params.idHipico)
        let hUpdate = await  db.Hipico.update({
            nombre: req.body.nombre,
            siglas: req.body.siglas,
            logo: req.files[0].filename,
            direccion: req.body.direccion,
            mail: req.body.mail,
            contrasena: hFound.contrasena,
            integrator: hFound.integrator,
            token: hFound.token, 
            pago_deuda: hFound.deuda, 
            pago_mes: hFound.pago_mes,
            pago_com: hFound.pago_com,
            habilitado: hFound.habilitado,
            created_at: hFound.created_at,
            updated_at: hFound.updated_at
        },{
            where: {
                id: hFound.id
            }
        })
        
        return res.redirect('/hipico/' + hFound.id + '/account');
        //return res.render('panelHipico')
    },
    logout: (req, res) => {
        req.session.destroy()
        res.redirect('/')
    }
}