
exports.user = function(req, res){
	var mongodb = require('mongodb');
	var dbconfig = require('./dbconfig');

	var mongoClient  = mongodb.MongoClient;
	
	mongoClient.connect(dbconfig.url, function(err, db){
		if(err){
			res.send(err);
			return;
		}
		var collection = db.collection('user');

		collection.find().toArray(function(err, rst){
			res.send(JSON.stringify(rst));
		});	
	});
}
