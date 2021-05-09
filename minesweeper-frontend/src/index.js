document.addEventListener('DOMContentLoaded', Cell.newGame)

function jsonToJS(resp) {
  return resp.json()
}

const tds = document.getElementsByTagName('td')

for (const td of tds) {
  td.addEventListener('click', Cell.search)
}
