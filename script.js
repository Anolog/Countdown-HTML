let countdown;
let totalSeconds = 0;
let countdownDisplay = document.getElementById('countdown');

function parseTimeInput(timeStr) {
    if (!timeStr) return 0;
    const timeParts = timeStr.split(/[: ]+/);
    let seconds = 0;
    timeParts.forEach(part => {
        if (part.includes('h')) seconds += parseInt(part) * 3600;
        else if (part.includes('m')) seconds += parseInt(part) * 60;
        else if (part.includes('s')) seconds += parseInt(part);
        else if (part.length === 2) seconds += parseInt(part) * 60; // MM
        else if (part.length === 1 || part.length === 2) seconds += parseInt(part); // SS
    });
    return seconds;
}

function updateTimerDisplay() {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    countdownDisplay.innerText = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function startTimer() {
    clearInterval(countdown);
    totalSeconds = parseTimeInput(document.getElementById('timeInput').value);

    countdown = setInterval(() => {
        if (totalSeconds <= 0) {
            clearInterval(countdown);
            countdownDisplay.innerText = '00:00:00';
            return;
        }
        totalSeconds--;
        updateTimerDisplay();
    }, 1000);
}

function stopTimer() {
    clearInterval(countdown);
}

function resetTimer() {
    clearInterval(countdown);
    totalSeconds = 0;
    updateTimerDisplay();
}

function increaseTimer() {
    const increaseSeconds = parseTimeInput(document.getElementById('increaseTimeInput').value);
    totalSeconds += increaseSeconds;
    updateTimerDisplay();
}

function decreaseTimer() {
    const decreaseSeconds = parseTimeInput(document.getElementById('decreaseTimeInput').value);
    totalSeconds = Math.max(totalSeconds - decreaseSeconds, 0);
    updateTimerDisplay();
}

document.getElementById('timeInput').addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        startTimer();
    }
});

document.getElementById('decreaseTimeInput').addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        decreaseTimer();
    }
});
