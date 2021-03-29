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
        db.Concurso.findByPk(req.params.idConcurso, {
            include: [
                {
                    association: 'Hipico'
                },
                {
                    association: 'Prueba',
                    include: [{association: 'Categoria'}]
                }
            ]
        })
        .then((concurso) => {
            res.render('detalleConcurso', {concurso});
        })
        .catch((e) => {
            res.send(e)
        })
    }, 
    iForm: function(req, res){
        res.render('formInscripcion');
    }, 
    pDetail: function(req, res){
        res.render('detallePrueba')
    },
    pEdit:  async function(req, res){
        let categorias = await db.Categoria.findAll()
        let prueba = await db.Prueba.findByPk(req.params.idPrueba, {
            include: [
                {association: 'Categoria'}
            ]
        })
        // return res.send(prueba)
        return res.render('formPruebaEdit', {prueba, categorias});
    },
    pUpdate: async (req, res) => {
        let prueba = await db.Prueba.findByPk(req.params.idPrueba)
        let pruebaUpdate = await db.Prueba.update({
            nombre: req.body.nombre,
            dia: req.body.dia,
            hora: req.body.hora,
            numero: req.body.numero,
            tipo: req.body.tipo,
            articulo: req.body.articulo, 
            definicion: req.body.definicion,
            precio: req.body.precio,
            altura: req.body.altura,
        }, {
            where: {
                id: req.params.idPrueba
            }
        })
        let catDestroy = await db.Categoria_prueba.destroy({
            where: {
                prueba_id: req.params.idPrueba
            }
        })
        let arrCategoria = [];
        if (req.body.categoria.length == 1){
            arrCategoria.push(req.body.categoria);
            console.log('es solo 1 categoria')
            let categoria = arrCategoria.map(elemento => {
                return {
                    prueba_id: prueba.id,
                    categoria_id: elemento
                }
            })
            let categorias = await db.Categoria_prueba.bulkCreate(categoria); 
        }else{
            let categoria = req.body.categoria.map(elemento => {
                return {
                    prueba_id: prueba.id,
                    categoria_id: elemento
                }
            })
            let categorias = await db.Categoria_prueba.bulkCreate(categoria);
        }
        return res.redirect('/concurso/'+ req.params.idConcurso + '/detail')
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
            hipico_id: req.session.hipicoSession,
            pagado: null,
            estado: 1
        })
        .then((concurso)=> {
            res.redirect('/concurso')
        })
        .catch((e) => {
            res.send(e)
        })
    },
    cUpdate: async (req, res) => {
        let hFound = await db.Hipico.findByPk(req.session.hipicoSession)

        let hUpdate = await db.Concurso.update({
            nombre: req.body.nombre,
            fecha: req.body.fecha,
            anteprograma: req.body.programa,
            total_rec: hFound.total_rec,
            hipico_id: req.session.hipicoSession.id,
            pagado: hFound.pagado,
            estado: hFound.estado
        }, {
            where: {
                id: req.params.idConcurso
            }
        })

        return res.redirect('/concurso/' + req.params.idConcurso + '/detail')
    },
    pForm: async (req, res) => {
        let concurso = await db.Concurso.findByPk(req.params.idConcurso)
        let categorias = await db.Categoria.findAll()
        return res.render('formPrueba', {concurso, categorias})    
    
    },
    pCreate: async (req, res) => {
   
        let prueba = await db.Prueba.create({
            nombre: req.body.nombre,
            dia: req.body.dia,
            hora: req.body.hora,
            numero: req.body.numero,
            tipo: req.body.tipo,
            articulo: req.body.articulo, 
            definicion: req.body.definicion,
            precio: req.body.precio,
            altura: req.body.altura,
            concurso_id: req.params.idConcurso,
            estado: 1,
            anotados: null, 
            total_rec: null
        })

        let arrCategoria = [];
        if (req.body.categoria.length == 1){
            arrCategoria.push(req.body.categoria);
            console.log('es solo 1 categoria')
            let categoria = arrCategoria.map(elemento => {
                return {
                    prueba_id: prueba.id,
                    categoria_id: elemento
                }
            })
            let categorias = await db.Categoria_prueba.bulkCreate(categoria); 
        }else{
            let categoria = req.body.categoria.map(elemento => {
                return {
                    prueba_id: prueba.id,
                    categoria_id: elemento
                }
            })
            let categorias = await db.Categoria_prueba.bulkCreate(categoria);
        }
        return res.redirect('/concurso/' + prueba.concurso_id + '/detail')
    },
    fin: async (req, res) => {
        let pFin = await db.Prueba.update({
            estado: 2
        }, {
            where: {
                concurso_id: req.params.idConcurso
            }
        })
        let cFin = await db.Concurso.update({
            estado: 2
        }, {
            where: {
                id: req.params.idConcurso
            }
        })
        return res.redirect('/concurso')
      
    }
}