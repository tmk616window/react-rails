# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# User.create(name: "user1", email: "user1", password: "user1", password_digest: "user1")


# Task.create(title: "task1", image: "task1", url: "task1", details: "task1", user_id: 1)

# ProLanguage.create(language:"ruby", task_id:1)
Like.create(user_id:1, task_id: 1)
Comment.create(text: "test", user_id:1 ,task_id:1)
Tool.create(name: "tool", task_id:1)
Content.create(title: "lange", text: "test#",task_id:1)
