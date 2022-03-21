class AddColumnUsers < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :image, :string
    add_column :users, :live, :string
    add_column :users, :details, :text
    add_column :users, :age, :integer
  end
end
