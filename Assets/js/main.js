const widthIm = 750;
const heightIm = 750;


var userName = "Participant";
var team = "Organizer";

var cvs = document.getElementById("mycvs");
var ctx = cvs.getContext("2d");


// const change = (e) => {
//     e.preventDefault();
//     console.log(e.target.value)
//     // const usname = document.getElementById("name").value;
// }

document.querySelector('.form').addEventListener('submit', (e) => {
    e.preventDefault();
    userName = e.target[0].value;
    team = e.target[1].value;
    clear();
    draw();
})

const clear = () => {
    ctx.fillStyle = "#00000000"
    ctx.fillRect(0,0,cvs.width, cvs.height);
}

// Draw Function
const draw = () => {
    var img = document.getElementById("badgeImg");
    ctx.drawImage(img, 0, 0, widthIm, heightIm);
    ctx.fillStyle = "white";
    ctx.font = "48px Arial";
    ctx.fillText(userName, cvs.width / 4 - 5, cvs.height - 205);
    ctx.font = "30px Arial";
    ctx.fillText(team, cvs.width / 4 + 42.5, cvs.height - 145);
}

// change participant name
// document.getElementById("changeName").addEventListener('click', (e) => {
//     userName = "test";
//     draw();
// });

window.onload = function () {
    draw();
    // throwConfetti()
};

const throwConfetti = () => {
    const confettiSettings = {target: 'mycvs'};
    const confetti = new ConfettiGenerator(confettiSettings);
    confetti.render();
    setTimeout(() => {
        confetti.clear();
    }, 5000)
}