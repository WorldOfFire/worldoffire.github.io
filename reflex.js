const tab = [
  "positionOne",
  "positionTwo",
  "positionThree",
  "positionFour",
  "positionFive",
  "positionSix",
  "positionSeven",
  "positionEight",
  "positionNine",
  "positionTen",
  "positionEleven",
  "positionTwelve",
  "positionThirteen",
  "positionFourteen",
  "positionFifteen",
  "positionSixteen",
  "positionSeventeen",
  "positionEighteen",
  "positionNineteen",
  "positionTwenty",
];
const tabTime = [];

let usedPosition;
let timeClick;
let gameCounter = 0;
let gamerCounter;

document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("startGameButton")
    .addEventListener("click", function () {
      let mainmenu = document.getElementById("startGame");
      let maingamecounter = document.getElementById("countAttempt");
      let backGame = document.getElementById("backButton");

      mainmenu.style.display = "none";
      maingamecounter.style.display = "flex";
      backGame.style.visibility = "visible";
    });
});

document.getElementById("submitButton").addEventListener("click", function () {
  const numberInput = document.getElementById("number");
  gamerCounter = numberInput.value;

  const value = parseInt(numberInput.value, 10);
  const min = parseInt(numberInput.min, 10);
  const max = parseInt(numberInput.max, 10);

  if (isNaN(value)) {
    alert("Aby rozpocząć grę musisz wpisać ilość prób.");
    return;
  }

  if (value < min || value > max) {
    alert(`Minimalna i maksymalna ilość prób w grze:  ${min} - ${max}`);
    return;
  }

  let maingamecounter = document.getElementById("countAttempt");
  let gamePlace = document.getElementById("gamePlace");
  let gameStats = document.getElementById("gameStats");

  maingamecounter.style.display = "none";
  gamePlace.style.display = "flex";
  gameStats.style.display = "flex";

  let startButton = document.getElementById("gameButton");
  startGame(startButton);
  game(startButton);
});
function startGame(startButton) {
  let classStart = losButton();
  if (startButton) {
    startButton.className = classStart;
    start();
  } else {
    console.error("Nie znaleziono przycisku!");
  }
}

function game(buttonElement) {
  buttonElement.addEventListener("click", function () {
    reset();
    let timepiecer = document.getElementById("gameCover");
    this.style.visibility = "hidden";
    timepiecer.style.display = "flex";

    startTimer(timepiecer);

    let classLos;

    do {
      classLos = losButton();
    } while (classLos === usedPosition);
    usedPosition = classLos;

    setTimeout(() => {
      this.className = classLos;
      timepiecer.style.display = "none";
      this.style.visibility = "visible";
      start();
    }, 3000);
  });
}

function losButton() {
  return tab[Math.floor(Math.random() * tab.length)];
}

let counter = 3;
let interval;

function startTimer(display) {
  document.getElementById("buttonStop").classList.add("disabled");
  counter = 3;
  display.textContent = `${counter}`;

  interval = setInterval(() => {
    counter--;
    display.textContent = `${counter}`;
  }, 1000);

  setTimeout(() => {
    clearInterval(interval);
    counter = 3;
    display.textContent = `${counter}`;
    document.getElementById("buttonStop").classList.remove("disabled");
  }, 3000);
}

let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let czas = "";

function updateTime() {
  const time = Date.now() - startTime + elapsedTime;
  const minutes = Math.floor(time / 60000);
  const seconds = Math.floor((time % 60000) / 1000);
  const milliseconds = time % 1000;

  document.getElementById("gameButton").textContent =
    `${String(minutes).padStart(2, "0")}:` +
    `${String(seconds).padStart(2, "0")}:` +
    `${String(milliseconds).padStart(3, "0")}`;
}

function start() {
  startTime = Date.now();
  timerInterval = setInterval(updateTime, 10);
}

function stop() {
  clearInterval(timerInterval);
  elapsedTime += Date.now() - startTime;
}

function reset() {
  clearInterval(timerInterval);
  const total = elapsedTime + (Date.now() - startTime);
  const minutes = Math.floor(total / 60000);
  const seconds = Math.floor((total % 60000) / 1000);
  const milliseconds = total % 1000;

  czas =
    `${String(minutes).padStart(2, "0")}:` +
    `${String(seconds).padStart(2, "0")}:` +
    `${String(milliseconds).padStart(3, "0")}`;
  tabTime.push(czas);
  historyUpdate();

  gameCounter++;

  startTime = 0;
  elapsedTime = 0;
  document.getElementById("gameButton").textContent = "00:00:000";
  console.log(gameCounter);

  if (gameCounter >= gamerCounter) {
    let gamePlace = document.getElementById("gamePlace");
    let buttonStop = document.getElementById("buttonStop");
    let buttonMainMenu = document.getElementById("mainMenu");
    let backGame = document.getElementById("backButton");

    gamePlace.style.display = "none";
    buttonStop.style.display = "none";
    buttonMainMenu.style.display = "flex";
    backGame.style.visibility = "hidden";

    stop();
  }
}

document.getElementById("buttonStop").addEventListener("click", function () {
  stop();
  let timepiecer = document.getElementById("gameCoverStart");
  timepiecer.style.display = "flex";
});
document.getElementById("gameContinue").addEventListener("click", function () {
  start();
  let timepiecer = document.getElementById("gameCoverStart");
  timepiecer.style.display = "none";
});

function historyUpdate() {
  const c = document.getElementById("timeGameInfo");

  c.innerHTML = "";

  tabTime.forEach((czas, index) => {
    const p = document.createElement("p");
    p.textContent = `${index + 1}: ${czas}`;
    p.classList.add("my-class");
    c.appendChild(p);
  });

  const p1 = document.createElement("p");
  p1.textContent = "_______________________";

  const p2 = document.createElement("p");
  p2.textContent = "Najlepszy czas reakcji:";

  const p3 = document.createElement("p");
  let shortestTime = shortestResponseTime(tabTime);
  p3.textContent = shortestTime;

  const p5 = document.createElement("p");
  p5.textContent = "Najgorszy czas reakcji:";

  const p6 = document.createElement("p");
  let longestTime = worstResponseTime(tabTime);
  p6.textContent = longestTime;

  const p8 = document.createElement("p");
  p8.textContent = "Średni czas reakcji:";

  const p9 = document.createElement("p");
  let avgTime = averageResponseTime(tabTime);
  p9.textContent = avgTime;

  c.appendChild(p1);
  c.appendChild(p2);
  c.appendChild(p3);
  c.appendChild(p5);
  c.appendChild(p6);
  c.appendChild(p8);
  c.appendChild(p9);
}

document.getElementById("mainMenu").addEventListener("click", function () {
  location.reload();
});
document.getElementById("backButton").addEventListener("click", function () {
  location.reload();
});
function shortestResponseTime(tabTime) {
  if (tabTime.length === 0) return null;

  const czasyMs = tabTime.map((czas) => {
    const [min, sec, ms] = czas.split(":").map(Number);
    return min * 60000 + sec * 1000 + ms;
  });

  const minMs = Math.min(...czasyMs);

  const minutes = String(Math.floor(minMs / 60000)).padStart(2, "0");
  const seconds = String(Math.floor((minMs % 60000) / 1000)).padStart(2, "0");
  const milliseconds = String(minMs % 1000).padStart(3, "0");

  return `${minutes}:${seconds}:${milliseconds}`;
}

function worstResponseTime(tabTime) {
  if (tabTime.length === 0) return null;

  const czasyMs = tabTime.map((czas) => {
    const [min, sec, ms] = czas.split(":").map(Number);
    return min * 60000 + sec * 1000 + ms;
  });

  const maxMs = Math.max(...czasyMs);

  const minutes = String(Math.floor(maxMs / 60000)).padStart(2, "0");
  const seconds = String(Math.floor((maxMs % 60000) / 1000)).padStart(2, "0");
  const milliseconds = String(maxMs % 1000).padStart(3, "0");

  return `${minutes}:${seconds}:${milliseconds}`;
}

function averageResponseTime(tabTime) {
  if (tabTime.length === 0) return null;

  const czasyMs = tabTime.map((czas) => {
    const [min, sec, ms] = czas.split(":").map(Number);
    return min * 60000 + sec * 1000 + ms;
  });

  const sumMs = czasyMs.reduce((acc, czas) => acc + czas, 0);
  const avgMs = sumMs / czasyMs.length;

  const minutes = String(Math.floor(avgMs / 60000)).padStart(2, "0");
  const seconds = String(Math.floor((avgMs % 60000) / 1000)).padStart(2, "0");
  const milliseconds = String(Math.round(avgMs % 1000)).padStart(3, "0");

  return `${minutes}:${seconds}:${milliseconds}`;
}
