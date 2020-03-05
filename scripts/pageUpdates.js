
/*
  Update the form based on game state
    - disaster track
    - event track
    - scheme track

  Show this form (hide other elements)
*/
function endPlayerScreen(){
  /*
  CHECK if disaster solved -> Slots
  CHECK if scheme solved -> Slots
  CHECK if event solved -> Slots
  CHECK if ERASE succeeded -> Number
  CHECK if hood is captured*/

  let curPlayerName = game.players.slots[game.players.current];
  let curCharName = game.characters.names[game.characters.slots[game.players.current]];
  let curCharColour = game.characters.colours[game.characters.slots[game.players.current]];
  console.log('Ending the turn for ',curPlayerName,curCharName,curCharColour);

  updateDisasterSlotsForm();
  updateDisasterTable();
  showHideEndPlayerForm();

  hTitle = 'End Player Phase';
  sTitle = '<span class="w3-padding-large w3-card-4 w3-border w3-' + curCharColour + '">Respond after ' + curPlayerName + ' (' + curCharName + ') has taken their turn</span>';
  sDesc = '';
  lBtn.visible = 'visible';
  lBtn.inner = 'No';
  qInput.visible = 'hidden';
  rBtn.inner = 'Yes';
  rBtn.onclick = 'hoodCapture()';
  updatePage(hTitle,sTitle,sDesc,lBtn,qInput,rBtn);

  nextPlayer();
}

function updateDisasterSlotsForm(){

  let elDisasterSlots = document.getElementById('divSolvedDisasterSlots');
  elDisasterSlots.textContent = '';

  // Update solved disasters
  let curDisasters = hood.tracks.disaster.slots;
  let len = curDisasters.length;
  let numDisasters = countArraySlots(curDisasters);
  if (numDisasters === 0){ return false; }

  let elNewTable = document.createElement('table');
  elNewTable.classList.add('w3-table');
  let elHeaderRow = document.createElement('tr');
  let elCheckboxRow = document.createElement('tr');
  let td = document.createElement('td');

  for (j = 0; j < 2; j++){
    for (let i = 0; i < len; i++){
      if (curDisasters[i] !== 0){
        // Add a cell
        if (j === 1){
          // Header cell
          let txt = document.createElement('b');
          txt.innerHTML = 'Slot ' + (i + 1);
          //elHeaderRow.appendChild(txt);
          td = document.createElement('td');
          td.classList.add('w3-center');
          td.classList.add('w3-large');
          td.appendChild(txt);
          elHeaderRow.appendChild(td);
        }else{
          // Row cell
          let chk = document.createElement('input');
          chk.setAttribute('type', 'checkbox');
          chk.setAttribute('checked', 'checked');
          chk.classList.add('w3-check');
          chk.id = 'chkSolvedDisaster' + i;
          td = document.createElement('td');
          td.classList.add('w3-center');
          td.appendChild(chk);
          elCheckboxRow.appendChild(td);
        }
      }
    }
  }

  elNewTable.appendChild(elHeaderRow);
  elNewTable.appendChild(elCheckboxRow);
  elDisasterSlots.appendChild(elNewTable);
}

function countArraySlots(arr){
  let len = arr.length;
  let count = 0;
  for (let i = 0; i < len; i++){
    if (arr[i] !== 0){
      count++
    }
  }
  return count;
}

function showHideEndPlayerForm(){
  if (elEndPlayerForm.style.display === 'none'){
    elEndPlayerForm.style.display = 'block';
    elDivActions.style.display = 'none';
  }else{
    elEndPlayerForm.style.display = 'none';
    elDivActions.style.display = 'block';
  }
}

// Show/Hide the tracks section at the top of the page
function showHideTracks(){
  if (elTracksSection.style.display === 'none'){
    elTracksSection.style.display = 'block';
  }else{
    elTracksSection.style.display = 'none';
  }
}

// Show/Hide the disaster slots on the endPlayer form
function showHideDisasterSlots(e){
  console.log('ShowHideDisaster',e);
  if (e){
    document.getElementById('divSolvedDisasters').style.display = "block";
  }else{
    document.getElementById('divSolvedDisasters').style.display = "none";
  }
}

// Show/Hide the scheme slots on the endPlayer form
function showHideSchemeSlots(e){
  console.log('ShowHideScheme',e);
  if (e){
    document.getElementById('divSolvedSchemes').style.display = "block";
  }else{
    document.getElementById('divSolvedSchemes').style.display = "none";
  }
}

// Show/Hide the event slots on the endPlayer form
function showHideEventSlots(e){
  console.log('ShowHideEvent',e);
  if (e){
    document.getElementById('divSolvedEvents').style.display = "block";
  }else{
    document.getElementById('divSolvedEvents').style.display = "none";
  }
}

function updateDisasterTable(){
  let dis = hood.tracks.disaster.slots;
  for (let i = 0; i < dis.length; i++){
    let thisCell = document.getElementById('disaster' + (i+1));
    let thisDis = dis[i];
    if (thisDis !== 0){
      thisCell.innerHTML = '<span style="color:red">Disaster</span>';
    }else{
      thisCell.innerHTML = 'None';
    }
  }
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
