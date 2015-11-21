var $username;
var $newMsg;
var $sendMsg;
var $chats;
var $rooms;

var _chats = [];
var _rooms = [];

var myChatsRef = new Firebase('https://chattyww.firebaseio.com/chats');
var myRoomsRef = new Firebase('https://chattyww.firebaseio.com/rooms');
Object.defineProperty(window, 'username', {
    set: function(val) {
        $username.text(val);
    },
    get: function() {
        return $username.text();
    }
});

$(document).ready(function() {
    $username = $('#username');
    $newMsg = $('#newMsg');
    $sendMsg = $('#sendMsg');
    $chats = $('#chats');
    $rooms = $('#rooms');

    myChatsRef.on('value', function(snapshot) {
        var chats = snapshot.val();
        _chats = []

        for( var id in chats ) {
            _chats.push(chats[id]);
        }

        finishedLoading('chats');
    });
    myRoomsRef.on('value', function(snapshot) {
        var rooms = snapshot.val();
        _rooms = [];

        for( var id in rooms ) {
            _rooms.push(rooms[id]);
        }

        finishedLoading('rooms');
    });

    $sendMsg.on('click', function() {
        onSendMsg($sendMsg.val());
        $sendMsg.val('');
    });

    $rooms.on('click', 'a', function() {
        onRoomChange($(this).data('name'));

        $('#rooms .active').removeClass('active');
        $(this).addClass('active');
    });
});

function getRooms() {
    return _rooms;
}

function getChats() {
    return _chats;
}

function clearChats() {
    $chats.empty();
}

function addRoom(roomName) {
    $rooms.append('<a href="#" class="list-group-item room" data-name="' + roomName + '">' + roomName + '</a>')
}

function addChat(chat) {
    $chats.prepend(
        '<div class="chat panel panel-default">' +
            '<div class="panel-heading">' +
                chat.username + ' in ' + chat.roomName +
            '</div>' +

            '<div class="panel-body">' +
                chat.message +
            '</div>' +
        '</div>'
    );
}

function createChat(chat, callback) {
    chat.createdAt = Firebase.ServerValue.TIMESTAMP;
    myChatsRef.push(chat, callback);
}

var sections = {
    rooms: false,
    chats: false
};
var appLoaded = false;
function finishedLoading(section) {
    if( appLoaded ) {
        return;
    }

    sections[section] = true;

    for( var key in sections ) {
        if( !sections[key] ) {
            return false;
        }
    }

    $(document.body).append('<script src="/scripts/app.js"></script>');
    appLoaded = true;
}