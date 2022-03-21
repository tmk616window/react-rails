class Like < ApplicationRecord
  belongs_to :task
  belongs_to :user

  validates :task_id, presence: true
  validates :user_id, presence: true
  validates :task_id, uniqueness: { scope: :user_id }
end
