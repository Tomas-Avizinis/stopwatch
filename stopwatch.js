
let totalTime = 0;
let startTime = 0;
let time = 0;
let pauseStart = 0;
let pausedTime = 0;
let countOn = false;
const laps = [];
let previousLaps = 0;

//timer clock
const clock = document.querySelector('.clock')
const timerLabel = document.querySelector('.timer-label')
const timer = document.querySelector('.timer1');
const timer2 = document.querySelector('.timer2');
const lapsView = document.querySelector('.laps');

//buttons
const startBtn = document.querySelector('.start');
const pauseBtn = document.querySelector('.pause');
const resumeBtn = document.querySelector('.resume');
const resetBtn = document.querySelector('.reset');
const lapBtn = document.querySelector('.lap');

pauseBtn.classList.add('hidden');
resumeBtn.classList.add('hidden');
resetBtn.classList.add('hidden');
lapBtn.classList.add('hidden');

startBtn.addEventListener('click', start);
pauseBtn.addEventListener('click', pause);
resumeBtn.addEventListener('click', resume);
lapBtn.addEventListener('click', lap);
resetBtn.addEventListener('click', reset);


const timeCounter = () => {
    if (countOn) {
        time = Date.now() - (startTime + pausedTime);
        if (formated(time).hundredthsSeconds <= 10) {
            drawSecondsDots(time);    
        }
    }
    if (laps.length) {
        previousLaps = laps.reduce((a,b) => a+b, 0);
        previousLaps -= previousLaps % 1000;
    };

    timerLabel.textContent = laps.length ? 'Total   ' + formated(previousLaps + time).line1 : ''

    if (!countOn) {timer.style.fontSize = (Math.floor((Date.now() - pauseStart) / 1000) % 4)? '4.5em' : '3em'  }
    timer.textContent = formated(time).line1;
    timer2.textContent = countOn? formated(time).hundredthsSeconds : '';  

    fadeSecondsDots();
}
setInterval(timeCounter, 100)

function drawSecondsDots(time) {
    const seconds = Math.floor((time / 1000) % 60);

    const bar = document.createElement('div');
    bar.classList.add('bar');
    const dotContainer = document.createElement('div');
    dotContainer.classList.add('dot-container')
    const dot = document.createElement('div');
    dot.classList.add('dot');

    bar.style.transform = `rotate(${90+seconds*6}deg)`;
    clock.append(bar);
    bar.append(dotContainer);
    dotContainer.append(dot);
    if (seconds % 5 === 0) {
        dot.style.width = '12px';

    }

    if (clock.querySelectorAll('.bar').length > 50) {
        clock.querySelectorAll('.bar')[0].remove();
    }
}

function fadeSecondsDots() {

    const maxIndex = clock.querySelectorAll('.bar').length;

    clock.querySelectorAll('.bar').forEach ((node, index) => {
        node.style.opacity = (100 - (maxIndex - index) * 2) / 100 ;
    })
}

function removeSecondsDots() {
    clock.querySelectorAll('.bar').forEach(node => node.remove());
}

const formated = (time) => {
    const speed = 1;
    const hundredthsSeconds = Math.floor((time*speed % 1000) / 10);
    const seconds = Math.floor((time*speed / 1000) % 60)
    const minutes = Math.floor((time*speed / 1000 / 60) % 60);
    const hours = Math.floor((time*speed / 1000 / 60 / 60) % 24);
    
    const hoursText = ((hours < 10)? '0' : '') + hours;
    const minutesText = ((minutes < 10) ? '0' : '') + minutes;
    const secondsText = ((seconds < 10) ? '0' : '') + seconds;
    const hoursMinutesSeconds = `${hours? hoursText+':' : ''}${minutesText}:${secondsText}`
    
    return {line1: hoursMinutesSeconds, hundredthsSeconds: hundredthsSeconds};
}

function start() {
    startTime = Date.now();
    countOn = true;
    startBtn.classList.add('hidden')
    pauseBtn.classList.remove('hidden');
    lapBtn.classList.remove('hidden');
}

function pause() {
    countOn = false;
    pauseBtn.classList.add('hidden');
    resumeBtn.classList.remove('hidden');
    resetBtn.classList.remove('hidden');
    lapBtn.classList.remove('hidden');
    pauseStart = Date.now();
}

function resume() {
    countOn = true;
    pausedTime += Date.now() - pauseStart;

    pauseBtn.classList.remove('hidden');
    resetBtn.classList.add('hidden');
    resumeBtn.classList.add('hidden');
}

function lap() {

    laps.push(time);

    const lapRecord = document.createElement('div');
    lapRecord.classList.add('lap-record')
    
    const lapNumber = document.createElement('div');
    lapNumber.classList.add('lap-number');
    lapNumber.textContent = `Lap${laps.length}`
    
    const lapTime = document.createElement('div');
    lapTime.classList.add('lap-time');

    lapTime.textContent = ` ${formated(time).line1}.${formated(time).hundredthsSeconds}`;
    lapsView.append(lapRecord);
    lapRecord.append(lapNumber, lapTime);

    if (!countOn) {
        resumeBtn.classList.add('hidden');
        resetBtn.classList.add('hidden');
        pauseBtn.classList.remove('hidden');
    };

    countOn = true;
    startTime = Date.now();
    time = 0;
    pauseStart = 0;
    pausedTime = 0;
    removeSecondsDots();
}

function removeLaps() {
    laps.length = 0;
    lapsView.querySelectorAll('.lap-record').forEach (node => node.remove());
}
function reset() {
    startTime = 0;
    time = 0;
    pauseStart = 0;
    pausedTime = 0;
    countOn = false;
    laps.length = 0;
    pauseBtn.classList.add('hidden');
    resumeBtn.classList.add('hidden');
    resetBtn.classList.add('hidden');
    lapBtn.classList.add('hidden');
    startBtn.classList.remove('hidden');
    removeSecondsDots();
    removeLaps();
}

clock.addEventListener('click', () => {
    if (countOn) pause()
    else if (pauseStart !== 0) resume();
    else start()
});


//pakeitimai3 - padaryti online githube
