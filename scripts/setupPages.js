/* Pages and functions relating to the setup screens - before the campaign itself starts */

function showSetup(page){

  page = page || 1;

  if (page === 1){

    hTitle = 'Setup';
    sTitle = 'Getting The Game Set Up (1/3)';
    sDesc = '<p>To setup the game, you should each select a character and then take their large-sized level-up card from the Above and Beyond expansion.</p><p>You can select from any of the base game (6) or Tracy Island (3) characters.</p>';
    lBtn.visible = 'hidden';
    qInput.visible = 'hidden';
    rBtn.inner = 'Next';
    rBtn.onclick = 'showSetup(2)';
    // TESTING HERE!
    //rBtn.onclick = 'addDisasters(1)';
    //rBtn.onclick = 'pushOrAdd()';

  }else if (page === 2){

    console.log('setup p2');
    hTitle = 'Setup';
    sTitle = 'Getting The Game Set Up (2/3)';
    sDesc = '<p>Place ALL the character pegs in their vehicles and place ALL the vehicles except Thunderbird 5 (Space Station) on Tracy Island.</p><br><em>Note: this includes FAB 1 and FAB 2 which would usually start in Europe.</em>';
    lBtn.visible = 'hidden';
    qInput.visible = 'hidden';
    rBtn.inner = 'Next';
    rBtn.onclick = 'showSetup(3)';

  }else if (page === 3){

    console.log('setup p3');
    hTitle = 'Setup';
    sTitle = 'Getting The Game Set Up (3/3)';
    sDesc = '<p>Finally, place the disaster deck on the board and the Hood marker on the first space on the Hood track.</p>';
    lBtn.visible = 'hidden';
    qInput.visible = 'hidden';
    rBtn.inner = 'Next';
    rBtn.onclick = 'showSetup(4)';

  }else if (page === 4){

    console.log('setup p4 - players');
    hTitle = 'Setup';
    sTitle = 'Players and Characters';
    sDesc = '<p>Please select the number of players, as well as each player and character names - these will be used to help the app keep the game flowing.</p><br><em>Please note: this will also determine the player order for the game - so enter the details for the first player in the first slot, then subsequent players in order.</em><br>';
    sDesc += 'Player 1: <input id="p1name" type="text" placeholder="Player 1 Name"></input> <select id="p1char"><option value="Scott" selected>Scott</option><option value="John">John</option></select>';
    lBtn.visible = 'hidden';
    qInput.visible = 'hidden';
    rBtn.inner = 'Next';
    rBtn.onclick = 'confirmPlayers()';

  }

  // Use generic function to update the display
  updatePage(hTitle,sTitle,sDesc,lBtn,qInput,rBtn);

}


// TESTING FUNCTION ONLY
function pushOrAdd(){
  let rndVal = Math.random();
  console.log(rndVal);
  if (rndVal < 0.3){
    addDisasters(1)
  }else if (rndVal < 0.6){
    pushDisasters(1)
  }else{
    advanceHood();
  }

}
