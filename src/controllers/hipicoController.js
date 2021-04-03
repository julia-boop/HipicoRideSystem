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
        let arr = []
        let result = []
        
        let reducer = (a, b) => {
            return a + b
        }

        function recCalc(g, p){
            for(let i = 0 ; i < p.length ; i ++){
                arr.push(g.splice(0, p[i]))
            }
            for(let i = 0 ; i < arr.length ; i ++){
                result.push(arr[i].reduce(reducer))

            }
            return result
        }

        let arrFin = []
        let resultFin = []
        
        function recCalcFin(g, p){
            for(let i = 0 ; i < p.length ; i ++){
                arrFin.push(g.splice(0, p[i]))
            }
            for(let i = 0 ; i < arrFin.length ; i ++){
                resultFin.push(arrFin[i].reduce(reducer))
            }
            return resultFin
        }

        let hipico = await db.Hipico.findByPk(req.params.idHipico)
        let concursos = await db.Concurso.findAll({
            include:[{association:'Prueba'}],
            where: {
                hipico_id: req.params.idHipico, 
                estado: 1
            }
        })
        let gananciaActual = []
        let pruebasCant = []
        for(let i = 0 ; i < concursos.length ; i ++){
            pruebasCant.push(concursos[i].Prueba.length)
            for(let j = 0 ; j < concursos[i].Prueba.length ; j++){
               gananciaActual.push(Number(concursos[i].Prueba[j].anotados*concursos[i].Prueba[j].precio))
            }
        }
        let ganancias = recCalc(gananciaActual, pruebasCant)
        let mensual = 5000

        let concursosFinalizados = await db.Concurso.findAll({
            include: [{association:'Prueba'}],
            where: {
                hipico_id: req.params.idHipico,
                estado: 2
            }
        })
        let gananciaActualFin = []
        let pruebasCantFin = []
        for(let i = 0 ; i < concursosFinalizados.length ; i ++){
            pruebasCantFin.push(concursosFinalizados[i].Prueba.length)
            for(let j = 0 ; j < concursosFinalizados[i].Prueba.length ; j++){
               gananciaActualFin.push(Number(concursosFinalizados[i].Prueba[j].anotados*concursosFinalizados[i].Prueba[j].precio))
            }
        }
        let gananciasFin = recCalcFin(gananciaActualFin, pruebasCantFin)
        let comisionFin = []
        for(let i = 0 ; i < gananciasFin.length ; i ++){
            comisionFin.push(Number(Number(gananciasFin[i])*0.15).toFixed(0))

        }
        comisionFin = comisionFin.map(Number)
        let deudaTotal = Number(comisionFin.reduce(reducer)+mensual)
        return res.render('panelHipico', {hipico, concursos, ganancias, mensual, concursosFinalizados, gananciasFin, comisionFin, deudaTotal});
        
        
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
    },
    logout: (req, res) => {
        req.session.destroy()
        res.redirect('/')
    }
}