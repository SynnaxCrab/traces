# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20101124114737) do

  create_table "admins", :force => true do |t|
    t.string   "email",                               :default => "", :null => false
    t.string   "encrypted_password",   :limit => 128, :default => "", :null => false
    t.string   "password_salt",                       :default => "", :null => false
    t.string   "reset_password_token"
    t.string   "remember_token"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",                       :default => 0
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "name"
  end

  add_index "admins", ["email"], :name => "index_admins_on_email", :unique => true
  add_index "admins", ["reset_password_token"], :name => "index_admins_on_reset_password_token", :unique => true

  create_table "comments", :force => true do |t|
    t.string    "name"
    t.string    "mail"
    t.string    "website"
    t.text      "content"
    t.integer   "post_id"
    t.timestamp "created_at"
    t.timestamp "updated_at"
  end

  create_table "posts", :force => true do |t|
    t.string   "title"
    t.text     "content"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "slug"
    t.integer  "admin_id"
  end

  create_table "posts_terms", :id => false, :force => true do |t|
    t.integer "post_id"
    t.integer "term_id"
  end

  create_table "terms", :force => true do |t|
    t.string    "name"
    t.string    "looking"
    t.timestamp "created_at"
    t.timestamp "updated_at"
    t.string    "slug"
  end

  create_table "wp_posts", :primary_key => "ID", :force => true do |t|
    t.integer  "post_author",           :limit => 20,  :default => 0,         :null => false
    t.datetime "post_date",                                                   :null => false
    t.datetime "post_date_gmt",                                               :null => false
    t.text     "post_content",                                                :null => false
    t.text     "post_title",                                                  :null => false
    t.text     "post_excerpt",                                                :null => false
    t.string   "post_status",           :limit => 20,  :default => "publish", :null => false
    t.string   "comment_status",        :limit => 20,  :default => "open",    :null => false
    t.string   "ping_status",           :limit => 20,  :default => "open",    :null => false
    t.string   "post_password",         :limit => 20,  :default => "",        :null => false
    t.string   "post_name",             :limit => 200, :default => "",        :null => false
    t.text     "to_ping",                                                     :null => false
    t.text     "pinged",                                                      :null => false
    t.datetime "post_modified",                                               :null => false
    t.datetime "post_modified_gmt",                                           :null => false
    t.text     "post_content_filtered",                                       :null => false
    t.integer  "post_parent",           :limit => 20,  :default => 0,         :null => false
    t.string   "guid",                                 :default => "",        :null => false
    t.integer  "menu_order",                           :default => 0,         :null => false
    t.string   "post_type",             :limit => 20,  :default => "post",    :null => false
    t.string   "post_mime_type",        :limit => 100, :default => "",        :null => false
    t.integer  "comment_count",         :limit => 20,  :default => 0,         :null => false
  end

end
