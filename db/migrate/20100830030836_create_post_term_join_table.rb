class CreatePostTermJoinTable < ActiveRecord::Migration
  def self.up
    create_table :posts_terms, :id => false do |t|
      t.integer :post_id
      t.integer :term_id
    end
  end

  def self.down
    drop_table :posts_terms
  end
end
