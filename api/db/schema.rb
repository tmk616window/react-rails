# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20_220_321_063_820) do
  create_table 'comments', options: 'ENGINE=InnoDB DEFAULT CHARSET=utf8mb4', force: :cascade do |t|
    t.text 'text', null: false
    t.bigint 'task_id', null: false
    t.bigint 'user_id', null: false
    t.datetime 'created_at', precision: 6, null: false
    t.datetime 'updated_at', precision: 6, null: false
    t.index ['task_id'], name: 'index_comments_on_task_id'
    t.index ['user_id'], name: 'index_comments_on_user_id'
  end

  create_table 'contents', options: 'ENGINE=InnoDB DEFAULT CHARSET=utf8mb4', force: :cascade do |t|
    t.string 'title', null: false
    t.text 'text', null: false
    t.bigint 'task_id', null: false
    t.datetime 'created_at', precision: 6, null: false
    t.datetime 'updated_at', precision: 6, null: false
    t.index ['task_id'], name: 'index_contents_on_task_id'
  end

  create_table 'likes', options: 'ENGINE=InnoDB DEFAULT CHARSET=utf8mb4', force: :cascade do |t|
    t.bigint 'task_id', null: false
    t.bigint 'user_id', null: false
    t.datetime 'created_at', precision: 6, null: false
    t.datetime 'updated_at', precision: 6, null: false
    t.index ['task_id'], name: 'index_likes_on_task_id'
    t.index ['user_id'], name: 'index_likes_on_user_id'
  end

  create_table 'pro_languages', options: 'ENGINE=InnoDB DEFAULT CHARSET=utf8mb4', force: :cascade do |t|
    t.string 'language'
    t.bigint 'task_id', null: false
    t.datetime 'created_at', precision: 6, null: false
    t.datetime 'updated_at', precision: 6, null: false
    t.index ['task_id'], name: 'index_pro_languages_on_task_id'
  end

  create_table 'tasks', options: 'ENGINE=InnoDB DEFAULT CHARSET=utf8mb4', force: :cascade do |t|
    t.string 'title', null: false
    t.string 'image', null: false
    t.text 'details', null: false
    t.string 'url', null: false
    t.bigint 'user_id', null: false
    t.datetime 'created_at', precision: 6, null: false
    t.datetime 'updated_at', precision: 6, null: false
    t.index ['user_id'], name: 'index_tasks_on_user_id'
  end

  create_table 'tools', options: 'ENGINE=InnoDB DEFAULT CHARSET=utf8mb4', force: :cascade do |t|
    t.string 'name'
    t.bigint 'task_id', null: false
    t.datetime 'created_at', precision: 6, null: false
    t.datetime 'updated_at', precision: 6, null: false
    t.index ['task_id'], name: 'index_tools_on_task_id'
  end

  create_table 'users', options: 'ENGINE=InnoDB DEFAULT CHARSET=utf8mb4', force: :cascade do |t|
    t.string 'name', null: false
    t.string 'email', null: false
    t.string 'password_digest', null: false
    t.datetime 'created_at', precision: 6, null: false
    t.datetime 'updated_at', precision: 6, null: false
    t.string 'image'
    t.string 'live'
    t.text 'details'
    t.integer 'age'
    t.index ['email'], name: 'index_users_on_email', unique: true
  end

  add_foreign_key 'comments', 'tasks'
  add_foreign_key 'comments', 'users'
  add_foreign_key 'contents', 'tasks'
  add_foreign_key 'likes', 'tasks'
  add_foreign_key 'likes', 'users'
  add_foreign_key 'pro_languages', 'tasks'
  add_foreign_key 'tasks', 'users'
  add_foreign_key 'tools', 'tasks'
end
