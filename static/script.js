let running = false;
let secondsLeft = 0;
let interval;

let audio = new Audio('static/Alarm/RetroAlarm.wav');

function toggleDropdown() {
    const dropdown = document.getElementById('soundDropdown');
    if (dropdown.style.display === "none" || dropdown.style.display === "") {
        dropdown.style.display = "flex";
    } else {
        dropdown.style.display = "none";
    }
}
function toggleDarkMode() {
    const body = document.body;
    const nightModeIcon = document.getElementById("nightModeIcon");
    const whiteModeIcon = document.getElementById("whiteModeIcon");

    if (body.classList.contains("dark-mode")) {
        body.classList.remove("dark-mode");
        nightModeIcon.classList.remove("hidden");
        whiteModeIcon.classList.add("hidden");
    } else {
        body.classList.add("dark-mode");
        nightModeIcon.classList.add("hidden");
        whiteModeIcon.classList.remove("hidden");
    }
}

document.addEventListener("DOMContentLoaded", function() {
    const body = document.body;
    const nightModeIcon = document.getElementById("nightModeIcon");
    const whiteModeIcon = document.getElementById("whiteModeIcon");

    if (localStorage.getItem('dark-mode') === 'enabled') {
        body.classList.add('dark-mode');
        nightModeIcon.style.display = 'none';  // Hide the Nightmode Icon
        whiteModeIcon.style.display = 'inline-block';  // Show the Whitemode Icon
    } else {
        nightModeIcon.style.display = 'inline-block';  // Show the Nightmode Icon
        whiteModeIcon.style.display = 'none';  // Hide the Whitemode Icon
    }

    // Add an event listener to the dark mode toggle icons
    nightModeIcon.addEventListener("click", toggleDarkMode);
    whiteModeIcon.addEventListener("click", toggleDarkMode);
});

function selectSound(soundFileName) {
    audio.src = soundFileName;  // Update the audio source to the selected sound
}

function startTimer() {
    let hours = parseInt(document.getElementById('hours').value) || 0;
    let minutes = parseInt(document.getElementById('minutes').value) || 0;
    let seconds = parseInt(document.getElementById('seconds').value) || 0;

    secondsLeft = hours * 3600 + minutes * 60 + seconds;
    if (secondsLeft <= 0) return;

    document.getElementById('startBtn').style.display = 'none';
    document.getElementById('resetBtn').style.display = 'inline-block';

    running = true;
    if (interval) {
        clearInterval(interval);
    }
    interval = setInterval(function() {
        if (secondsLeft > 0) {
            secondsLeft--;
            updateTimeRemaining();
            updateProgressBar();
        } else {
            audio.play();  // Play the sound
            stopTimer(false); // Stop button won't be displayed again
        }
    }, 1000);
}

function resetTimer() {
    stopTimer();
    audio.pause();  // Stop the sound
    audio.currentTime = 0;  // Reset the sound to the beginning
    secondsLeft = 0;
    updateTimeRemaining();
    updateProgressBar();
    document.getElementById('startBtn').style.display = 'inline-block';
    document.getElementById('resetBtn').style.display = 'none';
}

function stopTimer(showStopButton = true) {
    running = false;
    clearInterval(interval);
    document.getElementById('stopBtn').style.display = showStopButton ? 'inline-block' : 'none';
}

function updateTimeRemaining() {
    let hours = Math.floor(secondsLeft / 3600);
    let minutes = Math.floor((secondsLeft % 3600) / 60);
    let seconds = secondsLeft % 60;
    document.getElementById('time-remaining').textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function updateProgressBar() {
    let totalSeconds = (parseInt(document.getElementById('hours').value) || 0) * 3600 + 
                       (parseInt(document.getElementById('minutes').value) || 0) * 60 + 
                       (parseInt(document.getElementById('seconds').value) || 0);
    let progress = 100 - (secondsLeft * 100 / totalSeconds);
    document.querySelector('.progress').style.width = `${progress}%`;
}