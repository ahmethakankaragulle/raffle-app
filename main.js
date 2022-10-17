const CHAIRS = [];

function getChairs() {
  for (let j = 1; j <= 50; j++) {
    let temp = j.toString();
    CHAIRS.push(temp);
  }
  console.log(CHAIRS);
}

const rollEl = document.querySelector(".roll");
const rollAgainEl = document.querySelector(".roll-again");
const namesEl = document.querySelector(".names");
const winnerEl = document.querySelector(".winner");

function randomChairs() {
  const rand = Math.floor(Math.random() * CHAIRS.length);
  const name = CHAIRS[rand];
  namesEl.innerText = name;
}

function rollClick() {
  var audio = new Audio("drum.mp3");
  audio.load();
  audio.play();
  document.querySelector(".firework").style.display = "none";
  document.querySelector(".firework2").style.display = "none";
  document.querySelector(".firework3").style.display = "none";
  getChairs();
  rollEl.classList.add("hide");
  rollAgainEl.classList.add("hide");
  winnerEl.classList.add("hide");
  namesEl.classList.remove("hide");

  setDeceleratingTimeout(randomChairs, 10, 30);

  setTimeout(() => {
    namesEl.classList.add("hide");
    winnerEl.classList.remove("hide");
    rollAgainEl.classList.remove("hide");
    const winner = namesEl.innerText;
    winnerEl.innerText = winner;
    winnerEl.innerHTML = `<span>Kazanan</span><br>${winner}`;
    document.querySelector(".firework").style.display = "block";
    document.querySelector(".firework2").style.display = "block";
    document.querySelector(".firework3").style.display = "block";
  }, 4000);
}

function setDeceleratingTimeout(callback, factor, times) {
  const internalCallback = ((t, counter) => {
    return () => {
      if (--t > 0) {
        setTimeout(internalCallback, ++counter * factor);
        callback();
      }
    };
  })(times, 0);

  setTimeout(internalCallback, factor);
}
