console.log('script.js connected');

const inputs = document.getElementById('inputs');
const ul = document.getElementById('list');
const addNameBtn = document.getElementById('add');
const clearListBtn = document.getElementById('clear');
const pickBtn = document.getElementById('pick');
const textBox = document.getElementById('names');
const pickedDisplay = document.getElementById('pickedDisplay');
const deleteThis = document.getElementsByClassName('deleteThis');
const resetBtn = document.getElementById('reset');

let nameSet = new Set();

const $ = function (selector) {
  return document.querySelector(selector);
};

const winUl = document.getElementById('winlist');
let winnersList = [];

// ********* ADD LI ELEMENT TO UL *********
function addToList() {
  let names = document.getElementById('names').value;

  //Separates all names between commas
  let namesList = names.split(',');
  console.log(namesList);


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

    const li = document.createElement('li');
    // li.contentEditable = 'true';
    const sDel = '<button class="deleteThis" onclick="deleteThisFunc(this)" title="Delete name">X</button>';
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
  console.log("nameSet", nameSet);
}

// Press enter in input field
names.addEventListener('keyup', function (event) {
  if (event.keyCode === 13) addToList();
});
// Click on Add to List button
document.querySelector('#add').addEventListener("click", addToList);

// ************ PICK RANDOM FROM LIST ************
pickBtn.addEventListener('click', function () {
  // find the length of li elements in ul
  const liLength = ul.getElementsByTagName('li').length;
  let pickedLi;
  if (liLength === 0) {
    pickedDisplay.innerHTML.value = 'Name drawn will show here\nEnter names one at a time or separated by commas';
    pickedDisplay.style.color = '#ffffff';
  } else {
    let randomNum = Math.floor(Math.random() * liLength);
    pickedLi = ul.getElementsByTagName('li')[randomNum].children[1].textContent;
    // -- DISPLAY PICKED NAME --
    document.getElementById("pickedTitle").style.display = 'none';
    // pickedDisplay.innerText = pickedLi;
    pickedDisplay.innerText = pickedLi;
    pickedDisplay.style.color = '#00ea00';
    // -- CONSOLE TESTS --
    console.log('picked name', pickedLi);
    console.log('pick button clicked');
     // confetti
     document.getElementById('my-canvas').style.display = 'block'
     var confettiSettings = {
       target: "my-canvas",
     };
     var confetti = new ConfettiGenerator(confettiSettings);
     confetti.render();
     
     // close confetti afrer 30seconds
     setTimeout(function() {
       document.getElementById('my-canvas').style.display = 'none';
     }, 3000); 
    // this.disabled = true;

    //Move name from normal list to winner's list
    winnersList.push(pickedLi);
    ul.getElementsByTagName('li')[randomNum].remove();

    const li = document.createElement('li');
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

// ********* RESET WINNERS *********
resetBtn.addEventListener('click', function (event) {
  winnersList = [];
  ul.innerHTML = '';
  winUl.innerHTML = '';
  $('#pickedTitle').style.display = 'block';
  pickedDisplay.innerText = '';
  for (const element of nameSet) {
    const li = document.createElement('li');
    const sDel = '<button class="deleteThis" onclick="deleteThisFunc(this)" title="Delete name">X</button>';
    let name = `<p class="name">${element}</p>`;
    li.innerHTML = sDel + name;
    ul.appendChild(li);

    console.log('names', element);
    console.log(ul.innerText);
}
  
})

// ************ FUNCTIONS ************

// ---- DELETE THIS FUNCTION ----
function deleteThisFunc(e) {
  e.parentNode.remove();
  const parentLi = e.parentNode;
  const targetValue = parentLi.querySelector('.name').innerText;
  console.log(targetValue);
  nameSet.delete(targetValue);
  console.log(nameSet);
}
