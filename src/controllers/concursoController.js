module.exports = {
    read: function(req, res){
        res.render('concursos');
    },
    cDetail: function(req, res){
        res.render('detalleConcurso');
    }, 
    iForm: function(req, res){
        res.render('formInscripcion');
    }, 
    pDetail: function(req, res){
        res.render('detallePrueba')
    }
}