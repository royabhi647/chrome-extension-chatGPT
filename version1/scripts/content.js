let body = document.querySelector("body");

let btnBQ = document.createElement("button");
btnBQ.setAttribute("id", "btnBQ");
btnBQ.addEventListener("click", doSomething);
body.appendChild(btnBQ);

let speechRecognition = new webkitSpeechRecognition();
speechRecognition.continuous = true;
speechRecognition.interimResults = true;
speechRecognition.lang = "en-us";

let transcript = "";
speechRecognition.onresult = function (event) {
  transcript = "";
  for (let i = 0; i < event.results.length; i++) {
    transcript += event.results[i][0].transcript;
  }
};

document.addEventListener("keydown", handleKbd);

function handleKbd(event) {
  if (event.shiftKey && event.altKey && event.code === "KeyQ") {
    btnBQ.click();
  }
}

function doSomething() {
  if (btnBQ.hasAttribute("listening") === false) {
    btnBQ.setAttribute("listening", true);
    // console.log("I am all ears");
    speechRecognition.start();
  } else {
    btnBQ.removeAttribute("listening");
    // console.log("I am not listening anymore");
    speechRecognition.stop();
    // console.log("This is what you said - " + transcript);
    // debugger;
    const myPopup = new Popup({
      id: "my-popup",
      title: "Here is what you said:",
      content: transcript,
    });
    myPopup.show();
  }
}
