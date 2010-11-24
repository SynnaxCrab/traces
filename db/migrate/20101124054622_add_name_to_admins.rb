class AddNameToAdmins < ActiveRecord::Migration
  def self.up
    add_column :admins, :name, :string
  end

  def self.down
    remove_column :admins, :name
  end
end
