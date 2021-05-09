class Cell {

  constructor(cell) {
    this.bomb = cell.bomb
    this.number = cell.number
    this.location = cell.location
    this.flag = false
  }

  display() {
    if (this.bomb) {
      return "💣"
    } else if (this.number === 0) {
      return "&nbsp"
    } else {
      return this.number
    }
  }

  appendCell() {
    let td = document.getElementById(`${this.location}`)
    td.innerHTML = this.display()
    if (td.className === "") {
      unclicked -= 1
    }
    if (this.bomb) {
      td.className = 'bomb'
      Cell.lose()
    } else {
      td.className = 'clicked'
    }
    Cell.gameEnd()
  }

  static fetchCell(location) {
    fetch(`http://localhost:3000/cells/${location}`)
      .then(jsonToJS)
      .then(this.appendCells)
  }

  static appendCells(cells) {
    let newCell;
    if (Array.isArray(cells)) {
      for (const cell of cells) {
        newCell = new Cell(cell)
        newCell.appendCell()
      }
    } else {
      newCell = new Cell(cells)
      newCell.appendCell()
    }
  }

  static search(e) {
    if (e.target.className == "") {
      Cell.fetchCell(e.target.id)
    }
  }

  static newGame() {
    fetch('http://localhost:3000/cells', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    }})
    clearInterval(gameTimer)
    startTimer()
    timer.innerText = "00:00"
    unclicked = 100
    flagButton.innerText = "🚩 : 15"
    for (const td of tds) {
      td.innerHTML = "&nbsp;"
      td.className = ""
    }
  }

  static toggleFlag() {
    if (flagButton.className === "") {
      flagButton.className = "on"
      for (const td of tds) {
        td.removeEventListener('click', Cell.search)
        td.addEventListener('click', Cell.addFlag)
      }
    } else if (flagButton.className === "on") {
      flagButton.className = ""
      for (const td of tds) {
        td.removeEventListener('click', Cell.addFlag)
        td.addEventListener('click', Cell.search)
      }
    }
  }

  static addFlag(e) {
    if (e.target.className === "flag") {
      e.target.innerHTML = "&nbsp;"
      e.target.className = ""
      let flags = parseInt(flagButton.innerText.split(":")[1])
      flags += 1
      flagButton.innerText = `🚩 : ${flags}`
    } else if (e.target.className === "clicked") {

    }else {
      let flags = parseInt(flagButton.innerText.split(":")[1])
      if (flags > 0) {
        flags -= 1
        flagButton.innerText = `🚩 : ${flags}`
        e.target.innerText = "🚩"
        e.target.className = "flag"
        Cell.gameEnd()
      }
    }
  }

  static gameEnd() {
    if (flagButton.innerText === "🚩 : 0") {
      if (m.length === 0) {
        fetch("http://localhost:3000/cells")
        .then(jsonToJS)
        .then(Cell.checkFlags)
      } else {
        Cell.checkFlags(m)
      }
    } else if (unclicked === 15) {
      Cell.win()
    }
  }

  static win() {
    clearInterval(gameTimer)
    let score = timer.innerText
    let user = prompt("Enter your name for the Leaderboards:")
    if (user === null || user === "") {
      alert("Score Not Saved =(")
    } else {
      fetch("http://localhost:3000/scores", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: {
          "user": user,
          "score": score
        }
      })
    }
  }

  static lose() {
    console.log("You Lose")
  }

  static checkFlags(mines) {
    m = mines
    for (const mine of mines) {
      let bomb = new Cell(mine)
      let cell = document.getElementById(`${bomb.location}`)
      if (cell.className === "flag") {

      } else {
        return
      }
    }
    Cell.win()
  }

}
