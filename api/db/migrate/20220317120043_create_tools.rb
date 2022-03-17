class CreateTools < ActiveRecord::Migration[6.0]
  def change
    create_table :tools do |t|
      t.string :name, null: false
      t.references :task, null: false, foreign_key: true

      t.timestamps
    end
  end
end
