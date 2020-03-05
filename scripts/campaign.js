var elHeaderTitle, elSectionTitle, elSectionDescription, elLeftBtn, elRightBtn, elQuantityInput, elTracksSection, elDivActions, elEndPlayerForm;
var hTitle, sTitle, sDesc, lBtn = {}, qInput = {}, rBtn = {};

var game = {};

function startup(){

  // Setup variables
  game.players = {};
  //game.players.count = 0;
  game.players.count = 4;
  //game.players.slots = [];
  game.players.slots = ['Andy','Bill','Candy','Delia'];  // TESTING
  game.players.current = 0;
  game.characters = {};
  game.characters.count = 9;
  //game.characters.slots = [];
  game.characters.slots = [0,1,2,3]; // TESTING
  game.characters.names = ['Scott','Virgil','Alan','Gordon','John','Lady Penelope','Tin Tin','Brains','Parker'];
  game.characters.colours = ['blue','green','orange','yellow','white','pink','red','brown','black'];

  // Setup page elements
  elHeaderTitle = document.getElementById('headerTitle');
  elSectionTitle = document.getElementById('sectionTitle');
  elSectionDescription = document.getElementById('sectionDescription');
  elLeftBtn = document.getElementById('leftBtn');
  elRightBtn = document.getElementById('rightBtn');
  elQuantityInput = document.getElementById('quantityInput');
  elDivActions = document.getElementById('divActions');
  elEndPlayerForm = document.getElementById('frmEndPlayer');
  elEndPlayerForm.style.display = 'none';
  elTracksSection = document.getElementById('trkDiv');
  elTracksSection.style.display = 'none';

  var hRef = location.href;
  if (hRef.indexOf('load=') > 0){
    loadGame(hRef);
  }else{
    showSetup();
    setupGame();
    setupMap();
    setupHood();

    // Testing
    testActions();
    theHoodTurn();
  }

}

function loadGame(hRef){
    console.log('Loading save state...');
    var loadId = hRef.split('load=')[1];
    console.log('State found',loadId);
    // Parse loadId
    // Switch based on month
    // Setup game state
}

function startMonth(month,state){

}

function nextPlayer(){
  game.players.current++;
  // Show next player page - confirm once done
  //showHideEndPlayerForm();
}

function endMonth(month,state){

}
