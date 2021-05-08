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
      return " "
    } else {
      return this.number
    }
  }

  appendCell() {
    let td = document.getElementById(`${this.location}`)
    td.innerText = this.display()
  }

  static fetchCell(location) {
    fetch(`http://localhost:3000/cells/${location}`)
      .then(jsonToJS)
      .then(this.appendCells)
  }

  static fetchCells() {
    fetch("http://localhost:3000/cells")
    .then(jsonToJS)
    .then(this.appendCells)
  }

  static appendCells(cells) {
    if (Array.isArray(cells)) {
      for (const cell of cells) {
        let newCell = new Cell(cell)
        newCell.appendCell()
      }
    } else {
      let newCell = new Cell(cells)
      newCell.appendCell()
    }
  }

  static search(e) {
    Cell.fetchCell(e.target.id)
  }


}
