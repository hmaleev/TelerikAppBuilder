window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();

var lastTime;
var obstacles = [];
var counter=0;
function startGame() {
    var now = Date.now();
    var dt = (now - lastTime) / 1000.0;

    
    
    var c = document.getElementById("canvas");
    var ctx = c.getContext("2d");
    var direction = null;
    var CANVAS_WIDTH = c.width;
    var CANVAS_HEIGHT = c.height;
  //  var ship = document.getElementById("ship")
  //  alert("executed: ");
   // debugger;
        var player = {
            name: playerName,
            x: 125,
            y: 130,
            width: 45,
            height: 15,
            score: 0,
            active: true,
            draw: function () {
                ctx.beginPath();
                ctx.moveTo(140,430);
                ctx.lineTo(150,420);
                ctx.lineTo(160,430);
                ctx.closePath();
                ctx.fill();
               // canvas.drawImage(ship, 0, 9, 95, 87, player.x, player.y, player.width, player.height);
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
    player.draw();
  //  player.explode();
     
    
    
    function Obstacle(I) {
        I = I || {};

        I.active = true;

        I.color = "#A2B";

        I.x = Math.random() * 270;
        I.y = 0;
        I.xVelocity = 0;
       // I.yVelocity = Math.random() * 2;

         I.yVelocity =1;
        I.width = Math.random() *(CANVAS_WIDTH -80);
        I.height = 10;

        I.inBounds = function () {
            return I.x >= 0 && I.x <= CANVAS_WIDTH &&
              I.y >= 0 && I.y <= CANVAS_HEIGHT;
        };

        I.draw = function () {
            //    canvas.fillStyle = this.color;
                ctx.fillRect(0, this.y, this.width , this.height);
             ctx.fillRect(this.width+80, this.y, CANVAS_WIDTH -80 - this.width , this.height);
      //      canvas.drawImage(asteroid, 7, 5, 50, 50, this.x, this.y, this.width, this.height);

        };

        I.update = function () {
            I.x += I.xVelocity;
            I.y += I.yVelocity;

            I.active = I.active && I.inBounds();
        };
        I.explode = function () {
            this.active = false;
            player.score += 100;
        };
        return I;
    };


    function onConfirm(buttonIndex) {

        if (buttonIndex === 0) {
            alert("new game");
            player.active = true;
            enemies = [];
        }
    }
    
     function update(dt) {
        // debugger;
      
        if (player.x  >= 0  && player.x  < 270 ) {
            if (direction === "left") {
                player.x -= 2 ;
            }

            if (direction === "right") {
                player.x += 2 ;
            }
        }
        else {
            if (player.x <= 0) {
                player.x = 0 ;
            }
            if (player.x >= 269) {
                player.x = 269 ;
            }
        }



        obstacles.forEach(function (obstacle) {
            debugger;
            obstacle.update();
        });

        obstacles = obstacles.filter(function (obstacle) {
            return obstacle.active;
        });
        counter++;
        if (counter ===100) {
            obstacles.push(Obstacle());
            counter=0;
            var red = Math.floor(Math.random() *255);
            var green = Math.floor(Math.random() *255);
            var blue = Math.floor(Math.random() *255);
          $('#canvas').css('background-color', 'rgba('+red+', '+green+', '+blue+', 1)');
        }
    }
    
        function draw() {
            ctx.clearRect(0, 0, 500, 500);
            player.draw();
            obstacles.forEach(function (obstacle) {
                obstacle.draw();
            });
     //   handleCollisions();
    }
    
    update(dt);
    draw();

    lastTime = now;
    requestAnimFrame(startGame);
};
