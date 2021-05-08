# &#128163; -> unicode for bomb
# &#128681; -> unicode for flag

class Cell < ApplicationRecord

  BOMB = "&#128163;"
  FLAG = "&#128681;"
  @@mines = []

  def self.new_game
    self.all.each do |cell|
      cell.bomb = false
      cell.number = 0
      cell.save
    end
  end

  def self.pick_mines
    @@mines = Cell.all.sample(15)
    @@mines.each do |cell|
      cell.bomb = true
      cell.save
    end
  end

  def self.give_location
    GAME_BOARD.each_with_index do |row, row_number|
      row.each_with_index do |cell, column_number|
        cell.location = "#{row_number}-#{column_number}"
        cell.save
      end
    end
  end

  def self.fill_contents
    @@mines.each do |cell|
      row_number = cell.location.split("-")[0].to_i
      column_number = cell.location.split("-")[1].to_i
      if row_number == 0
        #check only below
        if column_number == 0
          #check only below and to the right
          GAME_BOARD[0][1].number += 1
          GAME_BOARD[0][1].save
          GAME_BOARD[1][0].number += 1
          GAME_BOARD[1][0].save
          GAME_BOARD[1][1].number += 1
          GAME_BOARD[1][1].save
        elsif column_number > 0 && column_number < 9
          #check below and both sides
          GAME_BOARD[0][column_number + 1].number += 1
          GAME_BOARD[0][column_number + 1].save
          GAME_BOARD[0][column_number - 1].number += 1
          GAME_BOARD[0][column_number - 1].save
          GAME_BOARD[1][column_number].number += 1
          GAME_BOARD[1][column_number].save
          GAME_BOARD[1][column_number + 1].number += 1
          GAME_BOARD[1][column_number + 1].save
          GAME_BOARD[1][column_number - 1].number += 1
          GAME_BOARD[1][column_number - 1].save
        elsif column_number == 9
          #check only below and to the left
          GAME_BOARD[0][8].number += 1
          GAME_BOARD[0][8].save
          GAME_BOARD[1][9].number += 1
          GAME_BOARD[1][9].save
          GAME_BOARD[1][8].number += 1
          GAME_BOARD[1][8].save
        end
      elsif row_number > 0 && row_number < 9
        #check above and below
        if column_number == 0
          #check above and below only to the right

          #checks directly to the right
          GAME_BOARD[row_number][column_number + 1].number += 1
          GAME_BOARD[row_number][column_number + 1].save
          #checks down and diagonal to the right
          GAME_BOARD[row_number + 1][column_number + 1].number += 1
          GAME_BOARD[row_number + 1][column_number + 1].save
          GAME_BOARD[row_number + 1][column_number].number += 1
          GAME_BOARD[row_number + 1][column_number].save
          #checks up and diagonal to the right
          GAME_BOARD[row_number - 1][column_number + 1].number += 1
          GAME_BOARD[row_number - 1][column_number + 1].save
          GAME_BOARD[row_number - 1][column_number].number += 1
          GAME_BOARD[row_number - 1][column_number].save
        elsif column_number > 0 && column_number < 9
          #check above and below and both sides

          #checks directly to the left and right
          GAME_BOARD[row_number][column_number - 1].number += 1
          GAME_BOARD[row_number][column_number - 1].save
          GAME_BOARD[row_number][column_number + 1].number += 1
          GAME_BOARD[row_number][column_number + 1].save
          #checks down and diagonal
          GAME_BOARD[row_number + 1][column_number - 1].number += 1
          GAME_BOARD[row_number + 1][column_number - 1].save
          GAME_BOARD[row_number + 1][column_number + 1].number += 1
          GAME_BOARD[row_number + 1][column_number + 1].save
          GAME_BOARD[row_number + 1][column_number].number += 1
          GAME_BOARD[row_number + 1][column_number].save
          #checks up and diagonal
          GAME_BOARD[row_number - 1][column_number - 1].number += 1
          GAME_BOARD[row_number - 1][column_number - 1].save
          GAME_BOARD[row_number - 1][column_number + 1].number += 1
          GAME_BOARD[row_number - 1][column_number + 1].save
          GAME_BOARD[row_number - 1][column_number].number += 1
          GAME_BOARD[row_number - 1][column_number].save
        elsif column_number == 9
          #check above and below only to the left

          #checks directly to the left
          GAME_BOARD[row_number][column_number - 1].number += 1
          GAME_BOARD[row_number][column_number - 1].save
          #checks down and diagonal to the left
          GAME_BOARD[row_number + 1][column_number - 1].number += 1
          GAME_BOARD[row_number + 1][column_number - 1].save
          GAME_BOARD[row_number + 1][column_number].number += 1
          GAME_BOARD[row_number + 1][column_number].save
          #checks up and diagonal to the left
          GAME_BOARD[row_number - 1][column_number - 1].number += 1
          GAME_BOARD[row_number - 1][column_number - 1].save
          GAME_BOARD[row_number - 1][column_number].number += 1
          GAME_BOARD[row_number - 1][column_number].save
        end
      elsif row_number == 9
        #check only above
        if column_number == 0
          #check only above and to the right
          GAME_BOARD[9][1].number += 1
          GAME_BOARD[9][1].save
          GAME_BOARD[8][0].number += 1
          GAME_BOARD[8][0].save
          GAME_BOARD[8][1].number += 1
          GAME_BOARD[8][1].save
        elsif column_number > 0 && column_number < 9
          #check above and both sides
          GAME_BOARD[9][column_number + 1].number += 1
          GAME_BOARD[9][column_number + 1].save
          GAME_BOARD[9][column_number - 1].number += 1
          GAME_BOARD[9][column_number - 1].save
          GAME_BOARD[8][column_number].number += 1
          GAME_BOARD[8][column_number].save
          GAME_BOARD[8][column_number + 1].number += 1
          GAME_BOARD[8][column_number + 1].save
          GAME_BOARD[8][column_number - 1].number += 1
          GAME_BOARD[8][column_number - 1].save
        elsif column_number == 9
          #check only above and to the left
          GAME_BOARD[9][8].number += 1
          GAME_BOARD[9][8].save
          GAME_BOARD[8][9].number += 1
          GAME_BOARD[8][9].save
          GAME_BOARD[8][8].number += 1
          GAME_BOARD[8][8].save
        end
      end
    end
  end

  def self.mines
    @@mines
  end

  def self.game_board
    board = []
    counter = 1

    10.times do
      inner_array = []
      10.times do
        inner_array.push(Cell.find_by_id(counter))
        counter += 1
      end
      game_board.push(inner_array)
    end
    board
  end

end
