class AddBombToCells < ActiveRecord::Migration[6.1]
  def change
    add_column :cells, :bomb, :boolean
    add_column :cells, :number, :integer
    add_column :cells, :location, :string
    remove_column :cells, :contents
  end
end
