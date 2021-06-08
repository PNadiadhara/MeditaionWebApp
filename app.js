const app = () => {
    const song = document.querySelector('.song');
    const play = document.querySelector('.play');
    const outline = document.querySelector('.moving-outline circle');
    const video = document.querySelector('.vid-container video');

    //Sounds
    const sounds = document.querySelectorAll('.sound-picker button');
    // Time display
    const timeDisplay = document.querySelector('.time-display');
    const timeSelect = document.querySelectorAll('.time-select button')

    const outLineLength = outline.getTotalLength();
    //console.log(outLineLength)
    //Duration
    let fakeDuration = 600;

    outline.style.strokeDasharray = outLineLength;

    // Select Sound
    timeSelect.forEach(option => {
        {
            option.addEventListener('click', function () {
                fakeDuration = this.getAttribute('data-time');
                timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${Math.floor(fakeDuration % 60)}`
            });
        }
    });

    // play sound on play button click
    play.addEventListener("click", () => {
        checkPlaying(song);
    });

    // pause play audio
    const checkPlaying = song => {
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

    // Animate Timer Circle
    // https://www.w3schools.com/jsref/event_ontimeupdate.asp

    song.ontimeupdate = () => {
        let currentTime = song.currentTime;
        console.log(currentTime);
        let elapsed = fakeDuration - currentTime;
        let seconds = Math.floor(elapsed % 60);
        let minutes = Math.floor(elapsed / 60);

        //Animation
        let progress = outLineLength - (currentTime / fakeDuration) * outLineLength;
        outline.style.strokeDashoffset = progress;
        // Text animation with template literals
        timeDisplay.textContent = `${minutes}:${seconds}`;

        // Stop animation on time up
        if (currentTime >= fakeDuration) {
            song.pause();
            song.currentTime = 0;
            play.src = "./svg/play.svg"
            video.pause();
        }
    };
};

app();