var currentRoom = 'Lobby';

var onSendMsg = function () {
    createChat({
        username: username,
        roomName: currentRoom,
        message: $newMsg.val()
    });

    $newMsg.val('');
    refreshChats();
};

var onRoomChange = function (roomName) {
    currentRoom = roomName;

    refreshChats();
};

var refreshChats = function () {
    clearChats();

    var chats = getChats();
    for (var i = 0; i < chats.length; i++) {
        if (chats[i].roomName === currentRoom) {
            addChat(chats[i]);
        }
    }
};

$(document).ready(function() {
    firstName = prompt('Enter your firstname');
    lastName = prompt('Enter your lastname');
    username = firstName + ' ' + lastName[0];

    if (firstName === '' && lastName === '') {
        username = 'Super Kloi';
    }

    setTimeout(function() {
        var rooms = getRooms();
        for (var i = 0; i < rooms.length; i++) {
            addRoom(rooms[i]);
        }
    }, 500);

    setInterval(refreshChats, 500);
});
