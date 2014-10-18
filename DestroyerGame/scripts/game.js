function show() {
    var FPS = 30;
    var c = document.getElementById("canvas");
    var canvas = c.getContext("2d");
    var direction = null;
    var CANVAS_WIDTH = c.width;
    var CANVAS_HEIGHT = c.height;
  //  alert("executed: ");
    
        var player = {
        name: playerName,
        x: 125,
        y: 130,
        width: 45,
        height: 15,
        score: 0,
        active: true,
        draw: function () {
            canvas.drawImage(ship, 0, 9, 95, 87, player.x, player.y, player.width, player.height);
        },
        explode: function () {
            this.active = false;
            navigator.notification.vibrate(400);
            navigator.notification.confirm(
            'Do you want to play another game?',
             onConfirm,
            'Game Over',
            ['No', 'Yes']);
        }
    }
    player.explode();
}

    function onConfirm(buttonIndex) {


        if (buttonIndex === 0) {
            alert("new game");
            player.active = true;
            enemies = [];
        }

    }