const db = require('../database/models');

async function createLocals(req, res, next) {
    if(req.session.hipicoSession != undefined) {
        let hipico = await db.Hipico.findByPk(req.session.hipicoSession)
        if(hipico) {
            res.locals.hipicoLoggeado = {
                id: hipico.id,
                habilitado: hipico.habilitado
            }
        } 
    }

    next()
}

module.exports = createLocals;