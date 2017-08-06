console.log('Loaded!');

var element = document.getElemntById("main-text");

element.innerHTML = 'New Value';

var img = element.getElelementById("madi");
var marginLeft = 0;
function moveRight() {
    marginLeft = marginLeft + 1;
    img.style.marginLeft = marginLeft + 'px';
}

img.onClick = function () {
    var interval = setInterval(moveRight,50);
}