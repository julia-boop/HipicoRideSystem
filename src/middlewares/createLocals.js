const db = require('../database/models');

async function createLocals(req, res, next) {
    if(req.session.userSession != undefined) {
        let user = await db.Usuario.findByPk(req.session.userSession)
        if(user) {
            res.locals.userLoggedIn = {
                id: user.id,
                rol: user.rol
            }
        }
    }
    // console.log(req.session.userSession)
    // console.log(res.locals.userLoggedIn)
    next()
}

module.exports = createLocals;