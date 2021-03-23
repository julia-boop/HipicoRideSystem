const db = require('../database/models');
const bcrypt = require('bcryptjs');

module.exports = {
    login: (req, res) => {
        res.render('hipicoLogin')
    },
    enter: async (req, res) => {

        let hLog = await db.Hipico.findOne( {
            where: {
                mail: req.body.email
            }
        })

        if(hLog){
            if(hLog.contrasena == ''){
               let hUpdate = await  db.Hipico.update({
                    nombre: hLog.nombre,
                    siglas: hLog.siglas,
                    logo: hLog.logo,
                    direccion: hLog.direccion,
                    mail: hLog.mail,
                    contrasena: bcrypt.hashSync(req.body.contrasena, 12),
                    integrator: hLog.integrator,
                    token: hLog.token, 
                    pago_deuda: hLog.deuda, 
                    pago_mes: hLog.pago_mes,
                    pago_com: hLog.pago_com,
                    habilitado: hLog.habilitado,
                    created_at: hLog.created_at,
                    updated_at: hLog.updated_at
                },{
                    where: {
                        id: hLog.id
                    }
                })
                req.session.hipicoSession = hLog.id
                return res.redirect('/')
            } else {
                if(bcrypt.compareSync(req.body.contrasena, hLog.contrasena)){
                    req.session.hipicoSession = hLog.id
                    return res.redirect('/')
                }else{
                    return res.render('hipicoLogin');
                }
            }
        } else {
            return res.render('hipicoLogin');
        }
    },
    account: (req, res) => {
        db.Hipico.findByPk(req.params.idHipico)
        .then((hipico) => {
            res.render('panelHipico', {hipico});
        })
        .catch((e) => {
            res.send(e)
        })
    },
    update: async (req, res) => {
        let hFound = await db.Hipico.findByPk(req.params.idHipico)
        let hUpdate = await  db.Hipico.update({
            nombre: req.body.nombre,
            siglas: req.body.siglas,
            logo: hFound.logo,
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