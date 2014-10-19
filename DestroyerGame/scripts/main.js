var newGameBtn = $("#newGameBtn");
var highScoresBtn = $("#highScoresBtn");
var settingsBtn = $("#settingsBtn");

var settingsView = $("#settingsView");
var highScoresView = $("#localHighScoresView");
var newGameView = $("#gameView");
var homepage =$("#homepage");

homepage.show();
newGameView.hide();
settingsView.hide();
highScoresView.hide();
newGameBtn.click(function (){
    
    homepage.hide();
    newGameView.show();
    settingsView.hide();
    highScoresView.hide();
    document.addEventListener("deviceready", function() { },false);
     //startGame();
    Game.resetPlayer();
    Game.play();
});

highScoresBtn.click(function (){
 
    homepage.hide();
    newGameView.hide();
    settingsView.hide();
    highScoresView.show();
});

settingsBtn.click(function (){
   // alert('New game started');
    homepage.hide();
    newGameView.hide();
    settingsView.show();
    highScoresView.hide();
})

document.addEventListener("backbutton", onBackKeyDown, false);

function onBackKeyDown() {
    // Handle the back button
    
    homepage.show();
    newGameView.hide();
    settingsView.hide();
    highScoresView.hide();

}