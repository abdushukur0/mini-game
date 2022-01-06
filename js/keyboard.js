window.onload = function () {
  const startButton = document.querySelector('#starter');
  startButton.onclick = function () {
    document.querySelector('.settings').classList.toggle('active');
    startButton.classList.toggle('active');
    document.querySelector('.score-check').classList.toggle('active');
  }

  const start = document.querySelector('#start');
  start.onclick = function () {
    // счетчик установка
    document.querySelector('.settings').classList.toggle('active');
    //Событие отслеживания клавиатуры
    const keys = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789"];

    let count = 0;

    function getRandomNumber(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function getRandomKey() {
      return keys[getRandomNumber(0, keys.length - 1)];
    }

    function targetRandomKey() {
      const key = document.getElementById(getRandomKey());
      key.classList.add("selected");
    }

    document.addEventListener("keyup", event => {
      const keyPressed = String.fromCharCode(event.keyCode);
      const keyElement = document.getElementById(keyPressed);
      const highlightedKey = document.querySelector(".selected");
      const score = document.querySelector("#score");

      keyElement.classList.add("hit");
      keyElement.addEventListener('animationend', () => {
        keyElement.classList.remove("hit");
      });

      if (keyPressed === highlightedKey.innerHTML && time > 0) {
        highlightedKey.classList.remove("selected");
        targetRandomKey();
        count++;
      } else {
        if (count >= 0) count--;
      }
      score.innerHTML = count;
    });
    targetRandomKey();
    //------------------------------------------//

    // Таймер
    var startingMinutes = document.querySelector('#time').value - 0;
    console.log(startingMinutes);
    let time = startingMinutes * 60;
    const timer = document.querySelector("#timer");

    let speedChecker = time;

    let timeId = setInterval(updateTimer, 1000);

    function updateTimer() {
      let minute = Math.floor(time / 60);
      let second = time % 60;
      if (second >= 10)
        timer.innerHTML = `${minute}:${second}`;
      else
        timer.innerHTML = `${minute}:0${second}`;
      time--;
      if (minute == 0 && second == 0) {
        clearTimeout(timeId);
        var result = Math.round((count / speedChecker) * 100) / 100;
        document.querySelector('.selected').classList.remove("selected");
        document.querySelector('.title').innerHTML = `
      <div>Your score is ${count} </div> 
      <div>Your midle speed ${result}  keys in second</div>`;
        if (result < 0.6) {
          document.querySelector('.title').innerHTML += '<div>Your print level: basic</div>';
        } else if (result >= 0.6 && result < 1) {
          document.querySelector('.title').innerHTML += '<div>Your print level: normal</div>';
        } else {
          document.querySelector('.title').innerHTML += '<div>Wow! You are professional. &#128181 &#128181  &#128181</div>';
        }
        document.querySelector('.title').innerHTML += '<button class="reload key" onClick="history.go(0);">Restart</button>';
        document.querySelector('.title').classList.add('finished');
      };
    }
  }
}