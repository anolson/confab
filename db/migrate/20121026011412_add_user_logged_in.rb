class AddUserLoggedIn < ActiveRecord::Migration
  def up
    add_column :users, :logged_in, :boolean, default: false
  end

  def down
    remove_column :users, :logged_in
  end
end
