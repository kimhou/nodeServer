define('module/video/index', function(require, exports, mosule){
    var $ = require('jquery');
    return {
        init: function(options){
            var self = this;
            self.doms = {
                nameInput: $('#userName'),
                submitNameBtn: $('#submitNameBtn'),
                myVideoOutput: $('#myVideoOutput'),
                receiveImg: $('#imgDom'),
                userList: $('#userList'),
                serverUserName: $('#currentServerName')
            };
            self.options = options || {};
            self.connectedUsers = [];
            self.bind();
        },
        bind: function (){
            var self = this,
                doms = self.doms;
            doms.nameInput.focus();
            $('#nameForm').on('submit', function(){
                self.userName = $.trim(doms.nameInput.val());
                if(self.userName.length){
                    $('#startContent').hide();
                    $('#videoContent').removeClass('hidden');
                    self.createUserMedia();
                    self.createSocket();
                }else{
                    doms.nameInput.focus();
                }
                return false;
            });
            doms.userList.delegate('a.js-user-li', 'click', function(e){
                e.preventDefault();
                var user = $(this).text();
                self.selectUser = user;
                doms.serverUserName.html('user ' + user + '\'s video:');
            });
           setInterval(function(){
            if(self.connectedUsers && self.connectedUsers.length){
                var html = [];
                for(var i = 0, len = self.connectedUsers.length; i < len; i++){
                    html.push('<li><a class="js-user-li" href="#">',self.connectedUsers[i],'</a></li>')
                }
                doms.userList.html(html.join(''));
            }
           }, 2000)
        },
        createUserMedia: function(){
            var self = this,
                doms = self.doms;
            window.URL = window.URL || window.webkitURL;
            navigator.getUserMedia  = navigator.getUserMedia || navigator.webkitGetUserMedia;
            navigator.getUserMedia({video: true, audio: true}, function(stream){
                doms.myVideoOutput.get(0).src = window.URL.createObjectURL(stream);
            }, function(err){
                console.log(err);
            });
            self.backCanvas = document.createElement('canvas');
            self.backContext = self.backCanvas.getContext('2d');
        },
        createSocket: function(){
            var self = this,
                doms = self.doms;
            self.socket = io.connect('http://localhost:3003');
            self.socket.on('connect', function(){
                self.drawImg();
            });
            self.socket.on('videoData', function(data){
                self.connectedUsers.indexOf(data.name) == -1 && self.connectedUsers.push(data.name);
                if(!self.selectUser){
                    self.selectUser = data.name;
                    doms.serverUserName.html('user <span clss="label label-info">' + data.name + '</span>\'s video:');
                }
                if(self.selectUser == data.name){
                    doms.receiveImg.get(0).src = data.data;
                }
            });
        },
        drawImg: function(){
            var self = this,
                doms = self.doms;
            self.backContext.drawImage(doms.myVideoOutput.get(0), 0, 0, 200, 150);
            var stringData = self.backCanvas.toDataURL('image/png');
            self.socket.emit('videoData', {name: self.userName, data: stringData});
            setTimeout(function(){
                self.drawImg();
            }, Math.floor(1000/12));
        }
    };
});