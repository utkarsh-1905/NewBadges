const widthIm = 750;
const heightIm = 750;

var userName = "Participant Name";
var team = "Team Name";
var code = "";
var cvs = document.getElementById("mycvs");
var ctx = cvs.getContext("2d");

// const change = (e) => {
//     e.preventDefault();
//     console.log(e.target.value)
//     // const usname = document.getElementById("name").value;
// }

document.querySelector(".form").addEventListener("submit", (e) => {
  e.preventDefault();
  userName = e.target[0].value;
  team = e.target[1].value;
  document.getElementById("down").style = "visibility: visible;";
  clear();
  draw();
  throwConfetti();
});

const clear = () => {
  //ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, cvs.width, cvs.height);
};

// Draw Function
const draw = () => {
  var img = document.getElementById("badgeImg");
  ctx.drawImage(img, cvs.width / 2 - (widthIm + 10) / 2, 0, widthIm, heightIm);
  ctx.fillStyle = "white";
  ctx.font = "48px Arial";
  ctx.textBaseline = "middle";
  ctx.textAlign = "center";
  // ctx.fillText(userName, cvs.width / 4 - 5, cvs.height - 205);
  // console.log(userName.length);
  ctx.fillText(
    userName,
    cvs.width / 2 - userName.length - 7.5,
    cvs.height - 215
  );
  ctx.font = "30px Arial";
  ctx.fillText(team, cvs.width / 2 - team.length - 9, cvs.height - 145);
};

window.onload = async function () {
  draw();
  await linkedinAuthToken();
  await linkedinAccessToken();
};

function download() {
  /// create an "off-screen" anchor tag
  var lnk = document.createElement("a"),
    e;

  if (
    !(
      userName == "Participant Name" ||
      userName == "" ||
      team == "Team Name" ||
      team == ""
    )
  ) {
    /// the key here is to set the download attribute of the a tag
    lnk.download = userName + ":" + team + ".png";

    /// convert canvas content to data-uri for link. When download
    /// attribute is set the content pointed to by link will be
    /// pushed as "download" in HTML5 capable browsers
    lnk.href = cvs.toDataURL("image/png;base64");

    /// create a "fake" click-event to trigger the download
    if (document.createEvent) {
      e = document.createEvent("MouseEvents");
      e.initMouseEvent(
        "click",
        true,
        true,
        window,
        0,
        0,
        0,
        0,
        0,
        false,
        false,
        false,
        false,
        0,
        null
      );

      lnk.dispatchEvent(e);
    } else if (lnk.fireEvent) {
      lnk.fireEvent("onclick");
    }
  }
}

document.getElementById("down").addEventListener("click", (e) => {
  download();
});

function dataURItoBlob(dataURI) {
  var byteString = atob(dataURI.split(",")[1]);
  var ab = new ArrayBuffer(byteString.length);
  var ia = new Uint8Array(ab);
  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ab], { type: "image/png" });
}
//Confetti config
const canvasTarget = document.getElementById("mycvs2");
const throwConfetti = () => {
  const confettiSettings = { target: canvasTarget };
  const confetti = new ConfettiGenerator(confettiSettings);
  confetti.render();
  setTimeout(() => {
    confetti.clear();
  }, 5000);
};

//Social Buttons

const btn = document.querySelector(".linkedin");

btn.addEventListener("click", () => {
  window.open(
    "https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=860rhmsc6a7xdy&redirect_uri=http%3A%2F%2F127.0.0.1%3A5500%2F2022%2Fbadge-pages%2Fparticipant.html&state=foobar&scope=r_liteprofile%20r_emailaddress%20w_member_social"
  );
});

const linkedinAuthToken = async () => {
  //getting oauth2 token
  const url_string = window.location.href;
  const url = new URL(url_string);
  code = url.searchParams.get("code");
  //Getting access token
  if (code) {
    console.log(code);
  }
};

const linkedinAccessToken = async () => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
  // myHeaders.append(
  //   "Cookie",
  //   'bcookie="v=2&3146a8b4-c69e-48ac-8cea-6266ecd62e48"; lang=v=2&lang=en-us; lidc="b=OB66:s=O:r=O:a=O:p=O:g=2602:u=170:x=1:i=1644939846:t=1645022580:v=2:sig=AQGxgkUHxcQttL_gu0I4CZC27_c04Y5p"; bscookie="v=1&2022021318185434af5ec6-7c59-4e87-8d24-258c49c1b47aAQEQ-0g9f1rNkowj6ffqC0AlQp2FcUrC"'
  // );

  var urlencoded = new URLSearchParams();
  urlencoded.append("grant_type", "authorization_code");
  urlencoded.append("code", code);
  urlencoded.append("client_id", "860rhmsc6a7xdy");
  urlencoded.append("client_secret", "1LO1D1kVWClIYkGx");
  urlencoded.append(
    "redirect_uri",
    "http://127.0.0.1:5500/2022/badge-pages/participant.html"
  );

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
    redirect: "follow",
  };

  const accessData = await fetch(
    "https://www.linkedin.com/oauth/v2/accessToken",
    requestOptions
  );
  const access_token = await accessData.text();
  console.log(access_token);
};

// module.export = { linkedinAuthToken, linkedinAccessToken };
