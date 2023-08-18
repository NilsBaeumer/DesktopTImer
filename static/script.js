let running = false;
let secondsLeft = 0;
let interval;

// Sound initialisieren
let audio = new Audio('/static/alarm.wav');

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
            audio.play();  // Hier wird der Sound abgespielt
            stopTimer(false); // Stop-Button wird nicht wieder angezeigt
        }
    }, 1000);
}

function resetTimer() {
    stopTimer();
    audio.pause();  // Stoppt den Sound
    audio.currentTime = 0;  // Setzt den Sound zurück
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
