"use strict";

const msg = new SpeechSynthesisUtterance();
let voices = [];

const voicesDropdown = document.querySelector("[name=voice]");
const options = document.querySelectorAll("[type=range], [name=text]");
const speakBtn = document.querySelector("#speak");
const stopBtn = document.querySelector("#stop");
console.log(options);

msg.text = document.querySelector("[name=text]").value;

// Push all available voices into the voices array
function populateVoices() {
  voices = this.getVoices();

  const voicesOption = voices
    .map((voice) => {
      // const nameOnly = voice.name.includes("Microsoft")
      //   ? voice.name.split("Microsoft ").join("")
      //   : voice.name;

      return `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`;
    })
    .join("");
  voicesDropdown.innerHTML = voicesOption;
}

// find a voice that's == the voice selected and change to it
function setVoice() {
  msg.voice = voices.find((voice) => voice.name === this.value);
  toggle(); //call the ftn for when a new voice is selected
}

// toggle ftn to either stop the ongoing speech and/or start a new one
const toggle = (startOver = true) => {
  speechSynthesis.cancel();
  if (startOver) {
    speechSynthesis.speak(msg);
  }
};

// Set the pitch, rate and texts to utter to the changed value
function setOption() {
  console.log(this.name, this.value);
  msg[this.name] = this.value;
  toggle();
}

speechSynthesis.addEventListener("voiceschanged", populateVoices);
voicesDropdown.addEventListener("change", setVoice); //listen for a change in the selected voice

options.forEach((option) => option.addEventListener("change", setOption));

speakBtn.addEventListener("click", toggle);
stopBtn.addEventListener("click", () => toggle(false)); //change the arg to false so it doesn't start over
