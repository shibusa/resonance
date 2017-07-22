var sitectrl = require('../controllers/sitectrl.js');

module.exports = function(app){
    app.get('/sites/all', function(req, res){
        sitectrl.index(req, res);
    })
    app.post('/site/add', function(req, res){
        sitectrl.addLocation(req, res);
    })
    app.post('/site/delete', function(req, res){
        sitectrl.deleteLocation(req, res);
    })
    app.post('/site/edit/:id', function(req, res){
        sitectrl.editLocation(req, res);
    })
    app.get('/site/:id', function(req, res){
        sitectrl.getLocation(req, res);
    })
}
