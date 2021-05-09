const tds = document.getElementsByTagName('td')
const newGameButton = document.getElementById('ng')
const flagButton = document.getElementById('flag')
const leaderboard = document.getElementById('lb')
const timer = document.getElementById('timer')
let unclicked = 100
let m = []
let gameTimer;

document.addEventListener('DOMContentLoaded', Cell.newGame)
newGameButton.addEventListener('click', Cell.newGame)
flagButton.addEventListener('click', Cell.toggleFlag)
leaderboard.addEventListener('click', getLeaderboard)
for (const td of tds) {
  td.className = ""
  td.addEventListener('click', Cell.search)
}


function jsonToJS(resp) {
  return resp.json()
}
function startTimer() {
  gameTimer = setInterval(function() {
    let minutes = parseInt(timer.innerText.split(":")[0])
    let seconds = parseInt(timer.innerText.split(":")[1])

    if (seconds < 59) {
      seconds += 1
      if (seconds == 0) {
        seconds = "00"
      } else if (seconds < 10) {
        seconds = `0${seconds}`
      }
    } else {
      seconds = "00"
      minutes += 1
      if (minutes == 0) {
        minutes = "00"
      } else if(minutes < 10) {
        minutes = `0${minutes}`
      }
    }
    timer.innerText = `${minutes}:${seconds}`
  }, 1000)
}
function getLeaderboard() {
  fetch('http://localhost:3000/scores')
  .then(jsonToJS)
  .then(openLeaderboard)
}
function openLeaderboard(leaderboard) {
  let counter = 1
  let scoreboard = ""
  for (const score of leaderboard) {
    let newScore = new Score(score)
    scoreboard += `${counter}. ${newScore.user}: ${newScore.time} \n`
    counter ++
  }
  swal("Leaderboard", scoreboard, "info")
}

startTimer()
