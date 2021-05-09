const tds = document.getElementsByTagName('td')
const newGameButton = document.getElementById('ng')
const flagButton = document.getElementById('flag')
const leaderboard = document.getElementById('lb')
const timer = document.getElementById('timer')
let gameTimer;

document.addEventListener('DOMContentLoaded', Cell.newGame)
newGameButton.addEventListener('click', Cell.newGame)
flagButton.addEventListener('click', Cell.toggleFlag)
for (const td of tds) {
  td.addEventListener('click', Cell.search)
}


function jsonToJS(resp) {
  return resp.json()
}
function startTimer() {
  gameTimer = setInterval(function() {
    let minutes = parseInt(timer.innerText.split("-")[0])
    let seconds = parseInt(timer.innerText.split("-")[1])

    if (seconds < 60) {
      seconds += 1
      if (seconds < 10) {
        seconds = `0${seconds}`
      }
    } else {
      seconds = 0
      minutes += 1
      if (minutes < 10) {
        minutes = `0${minutes}`
      }
    }
    timer.innerText = `${minutes}:${seconds}`
  }, 1000)
}


startTimer()
