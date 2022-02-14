const widthIm = 750;
const heightIm = 750;

var userName = "Participant";
var organizer = "Organizer";
window.lcode;
var cvs = document.getElementById("mycvs");
var ctx = cvs.getContext("2d");

document.querySelector(".form").addEventListener("submit", (e) => {
  e.preventDefault();
  userName = e.target[0].value;
  team = e.target[1].value;
  clear();
  draw();
});

const clear = () => {
  ctx.fillStyle = "#00000000";
  ctx.fillRect(0, 0, cvs.width, cvs.height);
};

// Draw Function
const draw = () => {
  var img = document.getElementById("badge");
  ctx.drawImage(img, 0, 0, widthIm, heightIm);
  ctx.fillStyle = "white";
  ctx.font = "48px Arial";
  ctx.fillText(userName, cvs.width / 4 - 5, cvs.height - 205);
  ctx.font = "30px Arial";
  ctx.fillText(organizer, cvs.width / 4 + 42.5, cvs.height - 145);
};

window.onload = async function () {
  draw();
  throwConfetti();
  const url_string = window.location.href;
  const url = new URL(url_string);
  const code = url.searchParams.get("code");
  if (code) {
    const oauth_access_payload = {
      grant_type: "authorization_code",
      code: code,
      redirect_uri: "http://127.0.0.1:5500/2022/badge-pages/participant.html",
      client_id: "860rhmsc6a7xdy",
      client_secret: "1LO1D1kVWClIYkGx",
    };
    console.log(code);
    const data = await fetch("https://www.linkedin.com/oauth/v2/accessToken", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
    });
  }
};

const canvasTarget = document.getElementById("mycvs");
const throwConfetti = () => {
  const confettiSettings = { target: canvasTarget };
  const confetti = new ConfettiGenerator(confettiSettings);
  confetti.render();
  setTimeout(() => {
    confetti.clear();
  }, 5000);
};
