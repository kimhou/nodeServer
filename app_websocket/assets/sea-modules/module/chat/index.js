define('module/chat/index', function(require, exports, mosule){
    var $ = require('jquery');
    return {
        init: function(){
            var self = this;
            self.doms = {
                nameForm : $('#startContent'),
                userName : $('#userName'),
                submitNameBtn : $('#submitNameBtn'),
                chatContent : $('#chatContent'),
                sendInput : $('#sendInput'),
                socketForm : $('#socketForm'),
                resultUl: $('#socketMsg')
            };
            self.doms.userName.focus();
            self.doms.submitNameBtn.on('click', function(){
                self.userName = self.doms.userName.val() || 'default name';
                self.startChat();
            });
            self.doms.userName.on('keyup', function(e){
                if(e.keyCode == 13){
                    self.doms.submitNameBtn.trigger('click');
                }
            });
        },
        startChat: function(){
            var self = this,
                doms = self.doms;
            self.createChat();
            doms.nameForm.hide();
            doms.chatContent.removeClass('hidden');
            doms.sendInput.focus();
            doms.socketForm.on('submit', function(){
                var msg = doms.sendInput.val();
                self.socket.emit('chatMsg', {name: self.userName, msg: msg || 'none'});
                self.addItem({
                    name: self.userName,
                    msg: msg
                }, 'send');
                doms.sendInput.val('').focus();
                return false;
            });
        },
        createChat: function(){
            var self = this,
                doms = self.doms;
            self.socket = io.connect('http://localhost:3002');
            self.socket.on('connect', function(){
                doms.resultUl.append('<li class="alert alert-warn">socket connected</li>');    
            });
            self.socket.on('chatMsg', function(data){
                self.addItem(data);
            });
        },
        addItem: function(data, type){
            var self = this,
                doms = self.doms,
                type = type || 'receive',
                item = $('<li style="display:none;" class="alert '+(type == 'receive' ? 'alert-success' : 'alert-info')+'">'+data.name +': '+data.msg+'<span class="muted pull-right">time: '+(new Date())+'</span></li>');
            doms.resultUl.prepend(item);
            item.slideDown();
        }

    }
})