document.addEventListener('DOMContentLoaded', Cell.newGame)

const tds = document.getElementsByTagName('td')
const newGameButton = document.getElementById('ng')
const flagButton = document.getElementById('flag')
const leaderboard = document.getElementById('lb')


for (const td of tds) {
  td.addEventListener('click', Cell.search)
}


function jsonToJS(resp) {
  return resp.json()
}
