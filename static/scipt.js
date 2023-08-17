let running = false;
let secondsLeft = 0;
let interval;

function startTimer() {
    let hours = parseInt(document.getElementById('hours').value) || 0;
    let minutes = parseInt(document.getElementById('minutes').value) || 0;
    let seconds = parseInt(document.getElementById('seconds').value) || 0;

    secondsLeft = hours * 3600 + minutes * 60 + seconds;
    if (secondsLeft <= 0) return;

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
            stopTimer();
            alert('Time is up!');
        }
    }, 1000);
}

function stopTimer() {
    running = false;
    clearInterval(interval);
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
