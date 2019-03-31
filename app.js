const app = () => {
  const song    = document.querySelector('.song'),
        play    = document.querySelector('.play'),
        outline = document.querySelector('.moving-outline circle'),
        video   = document.querySelector('.vid-container video'),
        sounds  = document.querySelectorAll('.sound-picker button'),
        timeDisplay     = document.querySelector('.time-display'),
        timeSelect      = document.querySelectorAll('.time-select button'),
        outlineLength   = outline.getTotalLength();
  
  // Duration
  let fakeDuration = 180;

  // duration animation
  outline.style.strokeDasharray = outlineLength;
  outline.style.strokeDashoffset = outlineLength;

  // Select different sounds and video
  sounds.forEach(sounds => {
    sounds.addEventListener('click', function () {
      song.src = this.getAttribute('data-sound');
      video.src = this.getAttribute('data-video');
      checkPlaying(song);
    })
  });

  // Play or pause sounds and video background
  play.addEventListener('click', ()=>{
    checkPlaying(song);
  });

  // Select time
  timeSelect.forEach(option => {
    option.addEventListener('click', function(){
      fakeDuration = this.getAttribute('data-time');
      timeDisplay.textContent = `${Math.floor(fakeDuration/60)}:${Math.floor(fakeDuration%60)}`
    })
  });

  const checkPlaying = song => {
    if(song.paused) {
      song.play();
      video.play();
      play.src = './svg/pause.svg';
    }else {
      song.pause();
      video.pause();
      play.src = './svg/play.svg';
    }
  };

  // Animate the outline as duration
  song.ontimeupdate = ()=> {
    let currentTime = song.currentTime;
    let elapsed = fakeDuration - currentTime;
    let seconds = Math.floor(elapsed % 60);
    let minutes = Math.floor(elapsed / 60);

    // outline
    let progress = outlineLength - (currentTime/fakeDuration) * outlineLength;
    outline.style.strokeDashoffset = progress;

    // Time display
    timeDisplay.textContent = `${minutes}:${seconds}`;

    if(currentTime>fakeDuration){
      song.pause();
      video.pause();
      song.currentTime = 0;
      play.src = './svg/play.svg';


    }
  };
};


app();