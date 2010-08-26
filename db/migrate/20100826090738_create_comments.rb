class CreateComments < ActiveRecord::Migration
  def self.up
    create_table :comments do |t|
      t.string :name
      t.string :mail
      t.string :website
      t.text :content

      t.timestamps
    end
  end

  def self.down
    drop_table :comments
  end
end
