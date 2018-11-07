const track1 = document.querySelector(".first-track");
const track2 = document.querySelector(".second-track");

// Exposes cues of all available languages
track1.onload = () => {
  document.querySelectorAll("track").forEach(track => {
    track.track.mode = "showing";
  });
};

const firstLanguage = document.querySelector(".first-language");
const nextText1 = firstLanguage.querySelector(".fl1");
const currentText1 = firstLanguage.querySelector(".fl2");
const lastText1 = firstLanguage.querySelector(".fl3");

const secondLanguage = document.querySelector(".second-language");
const nextText2 = secondLanguage.querySelector(".sl1");
const currentText2 = secondLanguage.querySelector(".sl2");
const lastText2 = secondLanguage.querySelector(".sl3");

// TODO: create function to handle seeking
// clear lastText and update other two

const updateSeek = times => {
  const video = document.querySelector("#my-video");

  [nextText1, nextText2].forEach(element => {
    element.addEventListener("click", () => {
      if (times[0] === undefined) {
        video.currentTime = 0;
      } else {
        video.currentTime = times[0].startTime;
      }
    });
  });

  [currentText1, currentText2].forEach(element => {
    element.addEventListener("click", () => {
      video.currentTime = times[1].startTime;
    });
  });

  [lastText1, lastText2].forEach(element => {
    element.addEventListener("click", () => {
      video.currentTime = times[2].startTime;
    });
  });
};

const updateQueue = () => {
  const tracks1 = Object.values(track1.track.cues);
  const tracks2 = Object.values(track2.track.cues);

  const current1 = track1.track.activeCues[0].text;
  let current2;

  // Assures current2 can be generated at the same time as current1
  // uses track1's first cue's start timeTime
  tracks2.forEach(cue => {
    if (track1.track.activeCues[0].startTime === cue.startTime) {
      current2 = cue.text;
    }
  });

  // Generate first and current texts under normal conditions
  lastText1.innerText = currentText1.innerText;
  currentText1.innerText = current1;

  lastText2.innerText = currentText2.innerText;
  currentText2.innerText = current2;

  // Generate next texts and adds event listeners for seeking on click
  tracks1.forEach((cue, index) => {
    if (track1.track.activeCues[0].startTime === cue.startTime) {
      nextText1.innerText = tracks1[index + 1].text;

      updateSeek([
        tracks1[index + 1], // fl1 next
        tracks1[index], // fl2 current
        tracks1[index - 1] // fl3 last, default to 0
      ]);
    }
  });

  tracks2.forEach((cue, index) => {
    if (track2.track.activeCues[0].startTime === cue.startTime) {
      nextText2.innerText = tracks2[index + 1].text;
    }
  });
};

// Updates texts on subtitle update
track1.oncuechange = updateQueue;
