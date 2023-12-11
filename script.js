let countdown;
let countdownDisplay = document.getElementById('countdown');

function parseTimeInput(timeStr) {
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

function startTimer() {
    clearInterval(countdown);
    const timeInput = document.getElementById('timeInput').value;
    let totalSeconds = parseTimeInput(timeInput);

    countdown = setInterval(() => {
        if (totalSeconds <= 0) {
            clearInterval(countdown);
            countdownDisplay.innerText = '00:00:00';
            return;
        }
        totalSeconds--;
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        countdownDisplay.innerText = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }, 1000);
}

function stopTimer() {
    clearInterval(countdown);
}

function resetTimer() {
    clearInterval(countdown);
    countdownDisplay.innerText = '00:00:00';
}

function decreaseTimer() {
    const decreaseInput = document.getElementById('decreaseTimeInput').value;
    let decreaseSeconds = parseTimeInput(decreaseInput);
    let currentSeconds = parseTimeInput(countdownDisplay.innerText);
    currentSeconds = Math.max(currentSeconds - decreaseSeconds, 0);
    countdownDisplay.innerText = `${Math.floor(currentSeconds / 3600).toString().padStart(2, '0')}:${Math.floor((currentSeconds % 3600) / 60).toString().padStart(2, '0')}:${(currentSeconds % 60).toString().padStart(2, '0')}`;
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
