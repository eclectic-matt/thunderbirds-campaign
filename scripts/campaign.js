var elHeaderTitle, elSectionTitle, elSectionDescription, elLeftBtn, elRightBtn, elQuantityInput;

function startup(){

  // Setup variables
  elHeaderTitle = document.getElementById('headerTitle');
  elSectionTitle = document.getElementById('sectionTitle');
  elSectionDescription = document.getElementById('sectionDescription');
  elLeftBtn = document.getElementById('leftBtn');
  elRightBtn = document.getElementById('rightBtn');
  elQuantityInput = document.getElementById('quantityInput');

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

function updatePage(hTitle,sTitle,sDesc,lBtn,qInput,rBtn){
  elHeaderTitle.innerHTML = hTitle;
  elSectionTitle.innerHTML = sTitle;
  elSectionDescription.innerHTML = sDesc;
  elLeftBtn.style.visibility = lBtn.visible;
  elLeftBtn.innerHTML = lBtn.inner;
  elLeftBtn.setAttribute('onclick', 'javascript: ' + lBtn.onclick + ';');
  elQuantityInput.style.visibility = qInput.visible;
  qInput.min = qInput.min || 1;
  elQuantityInput.setAttribute('min', qInput.min);
  qInput.max = qInput.max || 3;
  elQuantityInput.setAttribute('max', qInput.max);
  elRightBtn.style.visibility = rBtn.visible;
  elRightBtn.innerHTML = rBtn.inner;
  elRightBtn.setAttribute('onclick', 'javascript: ' + rBtn.onclick + ';');
}

function startMonth(month,state){

}

function nextPlayer(player,state){

}

function endMonth(month,state){

}
