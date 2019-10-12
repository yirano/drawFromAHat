console.log('script.js connected');

var inputs = document.getElementById('inputs');
var ul = document.getElementById('list');
var addNameBtn = document.getElementById('add');
var clearListBtn = document.getElementById('clear');
var pickBtn = document.getElementById('pick');
var textBox = document.getElementById('names');
var pickedDisplay = document.getElementById('pickedDisplay');
var deleteThis = document.getElementsByClassName('deleteThis');

var nameSet = new Set();

var $ = function (selector) {
  return document.querySelector(selector);
};

var winUl = document.getElementById('winlist');
var winnersList = [];

// ********* ADD LI ELEMENT TO UL *********
function addToList() {
  var names = document.getElementById('names').value;

  //Separates all names between commas
  var namesList = names.split(',');


  namesList.forEach(function(entry){
    // Sanitize the input for extra whitespace
    entry = entry.trim();

    //Checks if entry between commas is empty
    if(entry.replace(/\s/g, '') == ''){
      return;
    }

    // Check if name already inserted
    if (nameSet.has(entry)) {
        return;
    }

    // Insert to set otherwise
    nameSet.add(entry);

    var li = document.createElement('li');
    // li.contentEditable = 'true';
    var sDel = '<button class="deleteThis" onclick="deleteThisFunc(this)" title="Delete name">X</button>';
    let name = `<p class="name">${entry}</p>`;
    if (textBox.value !== '') {
      li.innerHTML = sDel + name;
      ul.appendChild(li);

      console.log('names', entry);
      console.log(ul.innerText);
    } else {
      console.log('nothing entered');
    }
  });

  document.getElementById('names').value = '';

  // -- CONSOLE TESTS --
  console.log('enter pressed');
}

// Press enter in input field
names.addEventListener('keyup', function (event) {
  if (event.keyCode === 13) addToList();
});
// Click on Add to List button
document.getElementById('add').onclick = function() {
  addToList();
}
// (I couldn't get it to work properly by just setting the onclick to addToList() for some reason, don't know why)

// ************ PICK RANDOM FROM LIST ************
pickBtn.addEventListener('click', function () {
  // find the length of li elements in ul
  var liLength = ul.getElementsByTagName('li').length;
  let pickedLi;
  if (liLength == 0) {
    pickedDisplay.innerHTML.value = 'Name drawn will show here\nEnter names each at a time or separated by commas';
    pickedDisplay.style.color = '#ffffff';
  } else {
    var randomNum = Math.floor(Math.random() * liLength);
    pickedLi = ul.getElementsByTagName('li')[randomNum].children[1].textContent;
    // -- DISPLAY PICKED NAME --
    document.getElementById("pickedTitle").style.display = 'none';
    // pickedDisplay.innerText = pickedLi;
    pickedDisplay.innerText = pickedLi;
    pickedDisplay.style.color = '#00ea00';
    // -- CONSOLE TESTS --
    console.log('picked name', pickedLi);
    console.log('pick button clicked');
    confetti.start(1100, 50, 450);
    // this.disabled = true;

    //Move name from normal list to winner's list
    winnersList.push(pickedLi);
    ul.getElementsByTagName('li')[randomNum].remove();

    var li = document.createElement('li');
    let name = `<p class="name"><span id="rank">${winnersList.length})</span>${pickedLi}</p>`;

    li.innerHTML = name;
    winUl.appendChild(li);

  }
});

pickedDisplay.addEventListener('click', function () {
  pickedDisplay.innerHTML = 'Name drawn will show here\nEnter names each at a time or separated by commas';
  pickedDisplay.style.color = '#ffffff';
});

// ********* CLEAR LIST *********
clearListBtn.addEventListener('click', function (event) {
  ul.innerHTML = '';
  winUl.innerHTML = '';
  winnersList = [];

  $('#pickedTitle').style.display = 'block';
  pickedDisplay.innerText = '';

  // Empty name set
  nameSet.clear();

  // -- CONSOLE TESTS --
  console.log('clear list button clicked');
});

// ************ FUNCTIONS ************

// ---- DELETE THIS FUNCTION ----
function deleteThisFunc(e) {
  e.parentNode.remove();
}
