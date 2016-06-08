class ChangeUsers < ActiveRecord::Migration
  def change
    add_column :users, :facebook_uid, :string
    add_column :users, :google_uid, :string

    change_column_null :users, :password_digest, true
  end
end
