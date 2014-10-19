window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();

//--------------------------------------------------------------------

var Game = ( function( window, undefined ) {
    
    var obstacles = [];
    var counter=0;
    var direction = null;
    var x=160;
    var c = document.getElementById("canvas");
    var ctx = c.getContext("2d");
   
    var CANVAS_WIDTH = c.width;
    var CANVAS_HEIGHT = c.height;

    
    var player = {
        name: playerName,
        width: 45,
        height: 15,
        score: 0,
        active: true,
        draw: function () {
            ctx.beginPath();
            ctx.moveTo(this.x-10,this.y);
            ctx.lineTo(this.x,this.y-10);
            ctx.lineTo(this.x+10,this.y);
            ctx.closePath();
            ctx.fill();
        },
        explode: function () {
            this.active = false;
            navigator.notification.vibrate(400);
            navigator.notification.confirm('Do you want to play another game?', function(buttonIndex) {
                alert(buttonIndex);
                if (buttonIndex === 0) {
                    alert("new game");
                    player.active = true;
                    enemies = [];
                }
            },'Game Over', ['No', 'Yes']);
        }
    }
    
    function Obstacle(I)    
    {
        I = I || {};

        I.active = true;
        I.color = "#A2B";
        I.x = Math.random() * 270;
        I.y = 0;
        I.xVelocity = 0;
        I.yVelocity =2;
        I.width = Math.random() *(CANVAS_WIDTH -80);
        I.height = 10;

        I.inBounds = function () {
            return  I.y >= 0 && I.y <= CANVAS_HEIGHT;
        };

        I.draw = function () {
            ctx.fillRect(0, this.y, this.width , this.height);
            ctx.fillRect(this.width+80, this.y, CANVAS_WIDTH -80 - this.width , this.height);
        };

        I.update = function () {
            I.y += I.yVelocity;
            I.active = I.active && I.inBounds();
        };
        I.explode = function () {
            this.active = false;
            player.score += 100;
        };
        return I;
    };

    function update() {
        if (x  > 0  && x  < CANVAS_WIDTH ) {
            if (direction === "left") {
                x-=4;
                console.log(x);
                player.x = x ;
            }

            if (direction === "right") {
                x+=4;
                console.log(x);
                player.x = x ;
            }
            if (direction === null) {
                x+=0;
                console.log(x);
                player.x = x ;
            }
        }
        else {
            if (x <= 0) {
                x = 0 ;
                player.x =x+10
            }
            if (x >= CANVAS_WIDTH) {
                x = CANVAS_WIDTH ;
                player.x = x-10;
            }
        }

        obstacles.forEach(function (obstacle) {
            obstacle.update();
            if (!obstacle.active) {
                obstacles.splice(0,1);
                var red = Math.floor(Math.random() *255);
                var green = Math.floor(Math.random() *255);
                var blue = Math.floor(Math.random() *255);
                $('#canvas').css('background-color', 'rgba('+red+', '+green+', '+blue+', 1)');
            }
        });

        obstacles = obstacles.filter(function (obstacle) {
            return obstacle.active;
        });
        counter++;
        if (counter ===40) {
            obstacles.push(Obstacle());
            counter=0;
        }
    }
    
    function draw() {
            ctx.clearRect(0, 0, 500, 500);
            player.draw();
            obstacles.forEach(function (obstacle) {
                obstacle.draw();
            });
        handleCollisions();
    }
    
    function collides(a, b) {
            var x1 = a.width  < b.x  ;
            var x2 =a.width +80 >b.x;
            var y1 =a.y===416;
            if (x1 ===false && y1) {
                alert("a.width: "+ a.width +"b.x: "+b.x);
                return true;
            }
            if (x2 === false && y1) {
                      alert("a.width: "+ a.width +" | b.x: "+b.x);
                return true;
            }
            return false;
    }

    function handleCollisions() {

        obstacles.forEach(function (obstacle) {
            if (collides(obstacles[0], player)) {
               // Score();
                enemy.explode();
                player.explode();
            }
        });
    }

    function startGame() {

      //  var now = Date.now();
      //  var dt = (now - lastTime) / 1000.0;   
        
       navigator.accelerometer.getCurrentAcceleration(function (acceleration) {
            if (acceleration.x > 1.8) {
            direction = "left";
           }
            else if (acceleration.x < -1.8) {
                direction = "right";
            }
           else if (acceleration.x < 1.8 && acceleration.x > 0) {
               direction = null;
           }
        } , function(){
      //      alert("error");
        });
    
     if(player.x === undefined || player.y === undefined) {
        player.x= 150;
        player.y= 430;
    }
    update();
    draw();

    lastTime = now;
    requestAnimFrame(startGame);
    
};
    // explicitly return public methods when this object is instantiated
    return {
    play : startGame,
    };
} )( window );
