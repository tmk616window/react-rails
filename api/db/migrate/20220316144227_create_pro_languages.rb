class CreateProLanguages < ActiveRecord::Migration[6.0]
  def change
    create_table :pro_languages do |t|
      t.string :language, null: false
      t.references :task, null: false, foreign_key: true

      t.timestamps
    end
  end
end
