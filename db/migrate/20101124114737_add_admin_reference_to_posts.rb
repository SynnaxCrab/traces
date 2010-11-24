class AddAdminReferenceToPosts < ActiveRecord::Migration
  def self.up
    add_column :posts, :admin_id, :integer
  end

  def self.down
    remove_column :posts, :admin_id
  end
end
