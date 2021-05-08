class CellsController < ApplicationController

  def index
    render json: Cell.game_board, except: [:created_at, :updated_at]
  end
end
