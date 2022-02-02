const app = () => {
  const song = document.querySelector(".song");
  const play = document.querySelector(".play");
  const replay = document.querySelector(".replay");
  const outline = document.querySelector(".moving-outline circle");
  const video = document.querySelector(".vid-container video");
  //Sounds
  const sounds = document.querySelectorAll(".sound-picker button");
  //Time Display
  const timeDisplay = document.querySelector(".time-display");
  const outlineLength = outline.getTotalLength();
  //Duration
  const timeSelect = document.querySelectorAll(".time-select button");
  let fakeDuration = 0;

  outline.style.strokeDashoffset = outlineLength;
  outline.style.strokeDasharray = outlineLength;

  const checkPlaying = (song) => {
    if (song.paused) {
      song.play();
      video.play();

      play.src = "./svg/pause.svg";
    } else {
      song.pause();
      video.pause();
      play.src = "./svg/play.svg";
    }
  };

  play.addEventListener("click", function () {
    checkPlaying(song);
  });

  // Animate the circle

  song.ontimeupdate = function () {
    let currentTime = song.currentTime;
    let ellapsed = fakeDuration - currentTime;
    let seconds = Math.floor(ellapsed % 60);
    let minutes = Math.floor(ellapsed / 60);

    //Animate the circle
    let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;

    outline.style.strokeDashoffset = progress;

    //Animate the text
    timeDisplay.textContent = `${minutes}:${seconds}`;

    if (currentTime >= fakeDuration) {
      song.pause();
      song.currentTime = 0;
    }
  };

  //Select sounds
  timeSelect.forEach((option) => {
    option.addEventListener("click", function () {
      fakeDuration = this.getAttribute("data-time");

      timeDisplay.textContent = `${Math.floor(
        fakeDuration / 60
      )} : ${Math.floor(fakeDuration % 60)}`;
    });
  });

  sounds.forEach((sound) => {
    sound.addEventListener("click", function () {
      song.src = this.getAttribute("data-sound");
      video.src = this.getAttribute("data-video");

      checkPlaying(song);
    });
  });

  const restartSong = (song) => {
    let currentTime = song.currentTime;
    song.currentTime = 0;
  };

  replay.addEventListener("click", function () {
    restartSong(song);
  });
};

app();
