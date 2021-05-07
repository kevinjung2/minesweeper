# &#128163; -> unicode for bomb
# &#128681; -> unicode for flag

class Cell < ApplicationRecord

  def self.new_game
    self.destroy_all
    Array.new(10) { Array.new(10) {Cell.create(contents: " ")} }
  end

  def self.pick_mines
    mines = Cell.all.sample(15)
    mines.each do |cell|
      cell.contents = "&#128163;"
      cell.save
    end
  end

end
