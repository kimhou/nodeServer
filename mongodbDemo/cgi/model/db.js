/*
 * db 元件
 */

//连接
var connect = function(url, callback){
	var MongoClient = require('mongodb').MongoClient;
	
	MongoClient.connect(url, function(err, db){
		callback(err, db);	
		db.close();
	});
};

var getTables = function(db){
	
};
