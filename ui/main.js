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
