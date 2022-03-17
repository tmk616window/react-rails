class CreateContents < ActiveRecord::Migration[6.0]
  def change
    create_table :contents do |t|
      t.string :title, null: false
      t.text :text, null: false
      t.references :task, null: false, foreign_key: true

      t.timestamps
    end
  end
end
