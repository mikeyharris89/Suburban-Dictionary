class CreateTerms < ActiveRecord::Migration
  def change
    create_table :terms do |t|
      t.string :name, null: false
      t.text :definition, null: false
      t.text :sentence, null: false
      t.integer :user_id, null: false
      t.timestamps null: false
    end

    add_index :terms, :user_id
  end
end
