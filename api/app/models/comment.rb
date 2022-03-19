class Comment < ApplicationRecord
  belongs_to :task
  belongs_to :user

  validates :text, presence: true
  validates :task_id, presence: true
  validates :user_id, presence: true
end
