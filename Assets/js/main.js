const widthIm = 750;
const heightIm = 750;

var userName = "Participant Name";
var team = "Team Name";

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
    document.getElementById("down").style = "visibility: visible;"
    clear();
    draw();
})

const clear = () => {
  //ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, cvs.width, cvs.height);
}

// Draw Function
const draw = () => {
  var img = document.getElementById("badgeImg");
  ctx.drawImage(img, cvs.width/2 - (widthIm + 10)/2, 0, widthIm, heightIm);
  ctx.fillStyle = "white";
  ctx.font = "48px Arial";
  ctx.textBaseline = 'middle';
  ctx.textAlign = "center";
  // ctx.fillText(userName, cvs.width / 4 - 5, cvs.height - 205);
  console.log(userName.length)
  ctx.fillText(userName, cvs.width/2 - (userName.length) - 7.5, cvs.height - 215);
  ctx.font = "30px Arial";
  ctx.fillText(team, cvs.width/2 - (team.length) - 9, cvs.height - 145);
};


function download() {
  /// create an "off-screen" anchor tag
  var lnk = document.createElement('a'), e;

  if(!(userName == "Participant Name" || userName == "" || team == "Team Name" || team == "")){

    /// the key here is to set the download attribute of the a tag
    lnk.download = userName + ":" + team + ".png";

    /// convert canvas content to data-uri for link. When download
    /// attribute is set the content pointed to by link will be
    /// pushed as "download" in HTML5 capable browsers
    lnk.href = cvs.toDataURL("image/png;base64");

    /// create a "fake" click-event to trigger the download
    if (document.createEvent) {
      e = document.createEvent("MouseEvents");
      e.initMouseEvent("click", true, true, window,
                      0, 0, 0, 0, 0, false, false, false,
                      false, 0, null);

      lnk.dispatchEvent(e);
    } else if (lnk.fireEvent) {
      lnk.fireEvent("onclick");
    }
  }
}


document.getElementById("down").addEventListener('click', (e) => {
  download();
})






// ------------------------------------------------------------------------------------

// function dataURItoBlob(dataURI) {
//   var byteString = atob(dataURI.split(',')[1]);
//   var ab = new ArrayBuffer(byteString.length);
//   var ia = new Uint8Array(ab);
//   for (var i = 0; i < byteString.length; i++) {
//       ia[i] = byteString.charCodeAt(i);
//   }
//   return new Blob([ab], {type: 'image/png'});
// }



// Twitter oauth handler
// $.oauthpopup = function (options) {
//   if (!options || !options.path) {
//       throw new Error("options.path must not be empty");
//   }
//   options = $.extend({
//       windowName: 'ConnectWithOAuth' // should not include space for IE
//       , windowOptions: 'location=0,status=0,width=800,height=400'
//       , callback: function () {
//           debugger;
//           //window.location.reload();
//       }
//   }, options);

//   var oauthWindow = window.open(options.path, options.windowName, options.windowOptions);
//   var oauthInterval = window.setInterval(function () {
//       if (oauthWindow.closed) {
//           window.clearInterval(oauthInterval);
//           options.callback();
//       }
//   }, 1000);
// };
// END Twitter oauth handler

//bind to element and pop oauth when clicked
// $.fn.oauthpopup = function (options) {
//   $this = $(this);
//   $this.click($.oauthpopup.bind(this, options));
// };


// $('#shareTW').click(function () {
//   var dataURL = $('#canvas')[0].toDataURL("image/png");
//   $.oauthpopup({
//       path: '/auth/twitter.php',
//       callback: function () {
//           console.log(window.twit);
//           var data = new FormData();
//           // Tweet text
//           data.append('status', "Look at the cute panda! " + window.location.href + " @jerezb31");
//           // Binary image
//           data.append('image', dataURL);
//           // oAuth Data
//           data.append('oauth_token', window.twit.oauth_token);
//           data.append('oauth_token_secret', window.twit.oauth_token_secret);
//           // Post to Twitter as an update with

//           return $.ajax({
//               url: '/auth/share-on-twitter.php',
//               type: 'POST',
//               data: data,
//               cache: false,
//               processData: false,
//               contentType: false,
//               success: function (data) {
//                   console.log('Posted to Twitter.');
//                   console.log(data);
//               }
//           });
//       }
//   });
// });


// ------------------------------------------------------------------------------------





window.onload = function () {
  draw();
  // throwConfetti();
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

