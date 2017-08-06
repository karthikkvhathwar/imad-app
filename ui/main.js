console.log('Loaded!');
/*var element = document.getElementById('main-text');

element.innerHTML = 'New Value';*/

/*var img = document.getElementById('madi');
var marginLeft = 0;
function moveRight() {
    marginLeft = marginLeft + 1;
    img.style.marginLeft = marginLeft + 'px';
}

img.onclick = function () {
    var interval = setInterval(moveRight,50);
};*/

var button= document.getElementById("counter");
button.onclick = function() {
    //Create a request object
    var request = new XMLHttpRequest();
    //Capture the response and store the response in the variable
    request.onreadystatechange = function() {
        if(request.readyState === XMLHttpRequest.DONE) {
            if(request.status === 200) {
                var counter = request.responseText;
                var span = document.getElementById("count");
                span.innerHTML = counter.toString();
            }
        }
    };
    //make a request
    request.open('GET','http://karthikhathwar28.imad.hasura-app.io/counter',true);
    request.send(null);
};

var nameInput = document.getElementById("name");
var nam = nameInput.value;

var submitbtn = document.getElementById("submit_btn");

submitbtn.onclick = function() {
    
    var names = ["name1","name2","name3","name4"];
    var li = '';
    
    for(var i=0;i<names.length;i++) {
        li = 'li'+names[i]+'/li';
    }
    
    var ul = document.getElementById("ul");
    ul.innerHTML = li;
}

