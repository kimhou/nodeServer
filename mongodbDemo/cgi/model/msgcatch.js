var http = require('http');
var request = require('request');
var url = 'http://tools.2345.com/duanxin/ajaxList.php?page=1&pid=1&cid=2';
var catchFun = function(req, res){
	request({url:url}, function(err, response, body){
console.log(body);
		if(!err && response.statusCode == 200){
			res.setHeader('Content-Type', 'text/json;charset=GBK;');
			res.send(body);
		}else{
			res.send('get url error:' + err);
		}
		res.end();
	});
}

exports.catch = catchFun;
