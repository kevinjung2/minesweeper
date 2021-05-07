# &#128163; -> unicode for bomb
# &#128681; -> unicode for flag

class Cell < ApplicationRecord

  def self.new_game
    self.destroy_all
    Array.new(10) { Array.new(10) {Cell.create(contents: " ")} }
  end

end
