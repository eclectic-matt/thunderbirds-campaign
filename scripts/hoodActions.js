var hood = {};
var map = {};
var game = {};
var schemes = {};

function setupGame(){
  game.over = false;
  game.month = 0;
  game.turn = 0;
}

function setupMap(){
  map.names = [
    'Europe',         // 0
    'Asia',           // 1
    'North Pacific',  // 2
    'North America',  // 3
    'North Atlantic', // 4
    'Africa',         // 5
    'Indian Ocean',   // 6
    'Australia',      // 7
    'South Pacific',  // 8
    'South America',  // 9
    'South Atlantic'  // 10
  ];
  map.links = [[]];
  map.links[0] = [4, 5, 1];
  map.links[1] = [0, 5, 6, 7, 2];
  map.links[2] = [1, 7, 8, 3];
  map.links[3] = [2, 8, 9, 4];
  map.links[4] = [3, 9, 10, 0, 5];
  map.links[5] = [0, 4, 10, 6, 1];
  map.links[6] = [5, 1, 7];
  map.links[7] = [1, 2, 6, 8];
  map.links[8] = [2, 3, 7, 9];
  map.links[9] = [3, 4, 8, 10];
  map.links[10] = [4, 5, 9];
}

function setupHood(){
  hood.vehicles = {};
  hood.vehicles.count = 3;
  hood.vehicles.speeds = [ 0, 2, 1 ];
  hood.vehicles.names = [
    'no vehicle',
    'plane',
    'submarine'
  ];
  hood.stolenVehicles = {};
  hood.stolenVehicles.count = 7;
  hood.stolenVehicles.speeds = [ 0, 3, 2, 3, 1, 1, 2, 2 ];
  hood.stolenVehicles.names = [
    'Thunderbird 1',
    'Thunderbird 2',
    'Thunderbird 3',
    'Thunderbird 4',
    'FAB 1',
    'FAB 2',
    'Ladybird Jet'
  ];
  hood.agents = {};
  hood.agents.count = 8;
  hood.agents.slots = [,,,,,,,];  // locations for agents
  hood.active = false;
  hood.base = false;
  hood.location = 1;  // Default to Asia
  hood.vehicle = 1; // Default to none 0, plane 1, sub 2, TB1 4, TB2 5 etc
  hood.tracks = {};
  hood.tracks.disaster = {};
  hood.tracks.disaster.length = 7;
  hood.tracks.disaster.current = 0;
  hood.tracks.disaster.slots = [0, 0, 0, 0, 0, 0, 0];
  hood.tracks.hood = {};
  hood.tracks.hood.length = 16;
  hood.tracks.hood.current = 0;
  // Currently just adding Schemes for testing
  hood.tracks.hood.slots = [ 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 2 ];
  hood.tracks.hood.types = [ 0, 0, 1, 0, 1, 0, 2, 0, 1, 0, 2, 0, 1, 0, 2 ];

}

function setupSchemes(){
  // Setup objects holding scheme details
}

function testActions(){
  // For testing
  //moveTheHood(hood.vehicle.speeds[hood.vehicle]);
  moveTheHood(2);
  console.log('Next Scheme is in slot ',getNextSchemeIndex());
  console.log('Distance to the next Scheme is ',getUnsolvedSchemeDistance());
  /*
  while (game.over !== true){
    //let randomInt1 = Math.floor(Math.random * 3);
    addDisasters(1);
    //let randomInt2 = Math.floor(Math.random * 3);
    pushDisasters(1);
  }
  */

}

function theHoodTurn(){

  /*
    Phases & Steps (KEY ACTIONS)

    End player phase:
      CHECK if disaster solved -> Slots
      CHECK if scheme solved -> Slots
      CHECK if event solved -> Slots
      CHECK if hood is captured

    Hood calculation phase:
      CALCULATE scheme danger level
      CALCULATE disaster danger level

    Hood deck actions phase - either:
      - advance hood (low scheme danger) -> CALCULATE if scheme failed
      - push disaster (low disaster danger and scheme danger) -> CALCULATE if disaster failed
      - draw event (low disaster danger)
      - draw disaster (low disaster danger) -> CALCULATE if disaster failed
      - spy attempt (higher scheme danger) -> Do this in part 2 *

    Hood board actions phase - either:
      - Escape -> Check Hood vehicle present -> Move
      - Escape -> Check Hood vehicle present -> Conspire
      - Escape -> Check if TB vehicle present -> Spy *
      - Move -> Check TB vehicle present -> Capture
      - Move -> Check TB vehicle present -> Conspire
      - Move -> Check if TB vehicle present -> Spy *
      - Conspire -> Check TB/Hood vehicle present -> Move
      - Conspire -> Check TB/Hood vehicle present -> Spy *

    Allow next player to go

  */


  // Ask if disaster(s) solved
  let dSuc = getDisastersSolved();
  // Ask if Scheme defeated
  let sSuc = getSchemeSolved();
  // Work out how far from the unsolved Scheme
  let hSlotsLeft = getUnsolvedSchemeDistance();
  // Fewer slots = lower chance of Hood advance
  let dSlotsLeft = getDisasterDistance();

  // Now work out the dangers
  let dDanger = calcDisasterDanger();
  let hDanger = calcHoodDanger();

  // Probability of disaster
  let dProb = (8 / dSuc) * dDanger;
  // Probability of Hood advance
  let hProb = (15 / sSuc) * sDanger;
  // Randomly draw disaster OR hood


}

function getDisastersSolved(){
  // Show input on screen
  let count = 0;
  // Calculate the count of these and update array
  // hood.tracks.disaster.slots
  return count;
}

function getSchemeSolved(){
  // Show input on screen
  let count = 0;
  // Calculate the count of these and update array
  // hood.tracks.hood.slots;
  return count;
}

function moveTheHood(spaces){
  let destIndex = 0;
  let locName = map.names[hood.location];
  let links = 0;
  console.log('Moving hood ' + spaces + ' spaces, starting in ' + locName);
  for (var i = 0; i < spaces; i++){
    links = map.links[hood.location].length;
    destIndex = Math.floor(Math.random() * links);
    hood.location = map.links[hood.location][destIndex];
    // Testing
    locName = map.names[hood.location];
    console.log(links, destIndex, hood.location, locName);
  }
  locName = map.names[hood.location];
  console.log('The Hood has moved ' + spaces + ' spaces to ' + locName);
}

function getNextSchemeIndex(){
  let cur = hood.tracks.hood.current + 1;
  let slots = hood.tracks.hood.slots;
  for (var i = cur; i < slots.length - 1; i++){
    if (slots[i] === 2){
      return i;
    }
  }
}

function revealNextScheme(level, slot){
  let newScheme = {};
  newScheme.level = level;
  newScheme.slot = slot;
  newScheme.requirements = {};

  hood.tracks.hood.slots[slot] = newScheme;
}

function getUnsolvedSchemeDistance(){
  let cur = hood.tracks.hood.current;
  let sch = getNextSchemeIndex();
  return sch - cur;
}

function getDisasterDistance(){
  return (hood.tracks.disaster.length - hood.tracks.disaster.current + 1);
}

function calcDisasterDanger(){
  return hood.tracks.disaster.current / hood.tracks.disaster.length;
}

function calcHoodDanger(){
  return hood.tracks.hood.current / hood.tracks.hood.length;
}

// NOTE: count means you have the option to push more than once
function addDisasters(count){
  let dis = hood.tracks.disaster;
  for (let i = 0; i < count; i++){
    let lastEl = dis.slots.pop();
    if (lastEl !== 0){
      // A disaster has reached the end!
      gameOver();
      return;
    }else{
      dis.slots.unshift(1);
      console.log('A new disaster has been added to the track');
    }
  }
  //console.log(dis.slots);
  hood.tracks.disaster.current += count;
  updateDisasterTable();
}

// NOTE: count means you have the option to push more than once
function pushDisasters(count){
  let dis = hood.tracks.disaster;
  for (let i = 0; i < count; i++){
    let lastEl = dis.slots.pop();
    if (lastEl !== 0){
      // A disaster has reached the end!
      gameOver();
      return;
    }else{
      dis.slots.unshift(0);
      console.log('Disasters have been pushed along the track');
    }
  }
  //console.log(dis.slots);
  hood.tracks.disaster.current += count;
  updateDisasterTable();
}

function updateDisasterTable(){
  let dis = hood.tracks.disaster.slots;
  for (let i = 0; i < dis.length; i++){
    let thisCell = document.getElementById('disaster' + (i+1));
    let thisDis = dis[i];
    if (thisDis !== 0){
      thisCell.innerHTML = 'Disaster';
    }else{
      thisCell.innerHTML = 'None';
    }
  }
}

/*
hood.tracks.hood = {};
hood.tracks.hood.length = 16;
hood.tracks.hood.current = 1;
hood.tracks.hood.slots = [];
*/
// NOTE: NO count as the Hood should only advance once per turn
function advanceHood(){
  let hTrk = hood.tracks.hood;
  // Check if the Hood is in the penultimate slot
  if (hTrk.current === hTrk.length - 2){
    console.log('Hood reached end of Hood track');
    // If penultimate slot reached, game over!
    gameOver();
  // If the next slot on the track contains a Scheme
  }else if (hTrk.slots[hTrk.current + 1] === 2){
    console.log('Hood reached a slot with a Scheme');
    // The Hood has reached a Scheme - game over!
    gameOver();
  }
  console.log('Hood moved along the track');
  hTrk.current++;
  updateHoodTable();
}

function countAvailableAgents(){
  let agentsArr = hood.agents.slots;
  let i = agentsArr.length;
  let count = 0;
  while (i--) {
    if (typeof agentsArr[i] === "undefined"){
      count++;
      index = i;
    }
  }
  let returnVal = {};
  returnVal.count = count;
  returnVal.index = index;
  console.log('Current there are ',count,' available agents with a space in index ',index);
  return returnVal;
}

function hoodConspires(location){
  let agentsArr = hood.agents.slots;
  let index = 0;
  // Check if no agents available
  let agentInfo = countAvailableAgents();
  if (agentInfo.count === 0){
    // Move an existing agent
    let prevLoc = agentsArr[index];
    index = agentsArr.length - 1;
    agentsArr[index] = location;
    console.log('Agent has been moved from ',prevLoc,' to ',location);
  }else{
    index = agentInfo.index;
    agentsArr[index] = location;
    console.log('Agent has been placed in ',location);
  }
  console.log(agentsArr);
}

function hoodHijack(stolenVehicleId){
  hood.vehicle = stolenVehicleId;
  stolenVehicleName = hood.stolenVehicles.names[stolenVehicleId];
  hTitle = 'Hood Turn';
  sTitle = 'The hood has hijacked ' + stolenVehicleName;
  sDesc = '<p>The Hood has hijacked ' + stolenVehicleName + '!</p><br><p>Ensure the Hood peg is placed in this vehicle.</p><br><b>Was there a Thunderbirds character peg in this vehicle at the time?</b>';
  lBtn.visible = 'visible';
  lBtn.inner = 'No';
  qInput.visible = 'hidden';
  rBtn.inner = 'Yes';
  rBtn.onclick = 'hoodCapture()';
  updatePage(hTitle,sTitle,sDesc,lBtn,qInput,rBtn);
}

function hoodCapture(){
  // The hood has captured a player
  hood.capturedCharacter = true;
  hTitle = 'Hood Turn';
  sTitle = 'Captured!';
  sDesc = '<p>Any characters in that vehicle are now captured!</p><br><p>Use the escape action on your turn to get out of the vehicle!</p><br><b>This concludes the Hood\'s turn</b>';
  lBtn.visible = 'hidden';
  qInput.visible = 'hidden';
  rBtn.inner = 'Next';
  rBtn.onclick = 'hoodTurnEnd()';
  updatePage(hTitle,sTitle,sDesc,lBtn,qInput,rBtn);
}

function updateHoodTable(){
  let len = hood.tracks.hood.length - 1;
  for (let i = 0; i < len; i++){
    let thisCell = document.getElementById('hood' + i);
    thisCell.innerHTML = '';
  }
  console.log('Hood has now been moved to slot ' + hood.tracks.hood.current);
  thisCell = document.getElementById('hood' + hood.tracks.hood.current);
  thisCell.innerHTML = '<b>Hood</b>';
}

function gameOver(){
  game.over = true;
  console.log('Game Over!');
}
