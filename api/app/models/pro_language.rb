class ProLanguage < ApplicationRecord
  belongs_to :task

  validates :language, presence: true
  validates :task_id, presence: true
end
