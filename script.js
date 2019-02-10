console.log("script.js connected");

var inputs = document.getElementById("inputs");
var ul = document.getElementById("list");
var addNameBtn = document.getElementById("add");
var clearListBtn = document.getElementById("clear");
var pickBtn = document.getElementById("pick");
var textBox = document.getElementById("names");
var pickedDisplay = document.getElementById('pickedDisplay');
var deleteThis = document.getElementsByClassName('deleteThis');
var li = document.createElement('li');
var $ = function (selector) {
    return document.querySelector(selector);
};


// ********* ADD LI ELEMENT TO UL *********
names.addEventListener("keyup", function(event){

        if (event.keyCode === 13) {
            var names = document.getElementById("names").value;
            var li = document.createElement('li');
                li.contentEditable = 'true';
            var span = document.createElement('span');
                span.innerHTML = 'x';
                span.className = 'deleteThis';
            var sDel = '<span class="deleteThis">x</span>';
            if (textBox.value!==''){

                li.innerHTML = sDel + names;
                ul.appendChild(li);


                var list = $('#list').getElementsByTagName('span');
                for(var i = 0; i < list.length; i++){
                    var listItem = list[i];
                    listItem.addEventListener('click', deleteThisFunc);
                }

                console.log("names", names);
                console.log(ul.innerText);
            } else {
                console.log("nothing entered");
            }

            document.getElementById("names").value = '';

            // -- CONSOLE TESTS --
            console.log("enter pressed");
        }



});

// ************ PICK RANDOM FROM LIST ************
pickBtn.addEventListener("click", function(){

    // find the length of li elements in ul
    var liLength = ul.getElementsByTagName('li').length;
    var randomNum = Math.floor(Math.random() * liLength);
    var pickedLi = ul.getElementsByTagName('li')[randomNum].innerText;

    // -- DISPLAY PICKED NAME --
    $('#pickedTitle').style.display = "none";
    // pickedDisplay.innerText = pickedLi;
    pickedDisplay.innerText = pickedLi.substring(1);
    pickedDisplay.style.color = "rgb(21, 116, 71)";
    // -- CONSOLE TESTS --
    console.log("picked name", pickedLi);
    console.log("pick button clicked");

    // this.disabled = true;

});

pickedDisplay.addEventListener("click", function(){
    pickedDisplay.innerHTML="Name drawn will show here";
    pickedDisplay.style.color = "rgb(77, 77, 77)";

});


// ********* CLEAR LIST *********
clearListBtn.addEventListener("click", function(event){
    ul.innerHTML='';

    $('#pickedTitle').style.display = "block";
    pickedDisplay.innerText = '';


    // -- CONSOLE TESTS --
    console.log("clear list button clicked");
});





// ************ FUNCTIONS ************

// ---- DELETE THIS FUNCTION ----
function deleteThisFunc() {
    this.parentNode.remove(this);
}

document.getElementById("add").onclick = function () {

    var names = document.getElementById("names").value;


    if (textBox.value !== '') {
        li.innerHTML = names;
        ul.appendChild(li);
    } else {
        console.log("nothing entered");

    }

    document.getElementById("names").value = '';

    console.log("add name button clicked");
};
