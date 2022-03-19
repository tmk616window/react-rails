class Content < ApplicationRecord
  belongs_to :task

  validates :title, presence: true
  validates :text, presence: true
  validates :task_id, presence: true
end
