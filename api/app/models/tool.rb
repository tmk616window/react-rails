class Tool < ApplicationRecord
  belongs_to :task
  validates :name, presence: true

  validates :task_id, presence: true
end
