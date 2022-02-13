
const widthIm = 750;
const heightIm = 750;


var userName = "Participant";
var organizer = "Organizer";

var cvs = document.getElementById("mycvs");
var ctx = cvs.getContext("2d");

// Draw Function
const draw = () => {
    var img = document.getElementById("badge");
    ctx.drawImage(img, 0, 0, widthIm, heightIm);
    ctx.fillStyle = "white";
    ctx.font = "48px Arial";
    ctx.fillText(userName,cvs.width/4 - 5,cvs.height - 205);
    ctx.font = "30px Arial";
    ctx.fillText(organizer,cvs.width/4 + 42.5,cvs.height - 145);
}

// change participant name
document.getElementById("changeName").addEventListener('click', (e) => {
    userName = "test";
    draw();
});

window.onload = function() {
    draw();
};