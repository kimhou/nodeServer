/*
 *CGI入口, 路由
 *
 */


exports.get = function(req, res){
	var mod = req.query.mod,
		act = req.query.act;
	if(mod && (model = require('./model/'+mod)) && model[act] && typeof(model[act]) == 'function'){
		model[act](req, res);
	}else{
		res.send('parameters error');
	}

	 console.log('query is:' + JSON.stringify( req.query));
}
