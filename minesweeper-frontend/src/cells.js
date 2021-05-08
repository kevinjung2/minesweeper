class Cell {

  constructor(cell) {
    this.bomb = cell.bomb
    this.number = cell.number
    this.location = cell.location
    this.flag = false
  }

  display() {
    if (this.bomb) {
      return "&#128163;"
    } else if (this.number === 0) {
      return " "
    } else {
      return this.number
    }
  }

  appendCell() {
    let td = document.getElementById(`${this.location}`)
    td.innerText = this.display
  }

  static fetchCell(location) {
    fetch(`http://localhost:3000/cells/${location}`)
      .then(jsonToJS)
      .then(appendCells)
  }

  static fetchCells() {
    fetch("http://localhost:3000/cells")
    .then(jsonToJS)
    .then(appendCells)
  }

  static appendCells(cells) {
    debugger
    if (Array.is_array(cells)) {
      for (const cell of cells) {
        let newCell = new Cell(cell)
      }
    } else {
      let newCell = new Cell(cells)
    }
    newCell.appendCell()
  }


}
