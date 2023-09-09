const timeDisplay = document.querySelector('#timeDisplay')
const start = document.querySelector('#start');
const pause = document.querySelector('#pause');
const reset = document.querySelector('#reset');

let startTime = 0;
let elapsedTime = 0;
let currentTime = 0;
let paused = true;
let intervalId;
let mins = 0;
let secs = 0;
let milli = 0;

start.addEventListener("click", () =>{
    if (paused) {
        paused = false;
        startTime = Date.now() - elapsedTime;
        intervalId = setInterval(updateTime, 10);
        start.textContent = "Start"
    }
});
pause.addEventListener("click", () =>{
    if (!paused) {
        paused = true;
        elapsedTime = Date.now() - startTime;
        clearInterval(intervalId);
        start.textContent = "Resume"
    }
});
reset.addEventListener("click", () =>{
    paused = true;
    clearInterval(intervalId);
    startTime = 0;
    elapsedTime = 0;
    currentTime = 0;
    mins = 0;
    secs = 0;
    milli = 0;
    timeDisplay.textContent = "00:00:00"
    start.textContent = "Start"
});

function updateTime() {
    elapsedTime = Date.now() - startTime;

    milli = Math.floor(elapsedTime / 10 % 100);
    secs = Math.floor(elapsedTime / 1000 % 60);
    mins = Math.floor(elapsedTime / (1000 * 60) % 60);

    secs = pad(secs);
    mins = pad(mins);
    milli = pad(milli);
    
    timeDisplay.textContent = `${mins}:${secs}:${milli}`

    function pad(unit) {
        return (("0") + unit).length > 2 ? unit : "0" + unit;
    }
}