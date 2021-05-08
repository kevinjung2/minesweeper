class CellsController < ApplicationController

  def index
    render json: Cell.game_board, except: [:created_at, :updated_at]
  end

  def show
    render json: Cell.find_by(location: params[:id]), except: [:created_at, :updated_at]
  end
end
