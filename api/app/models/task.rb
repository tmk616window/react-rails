class Task < ApplicationRecord
  belongs_to :user
  has_many :pro_languages, dependent: :destroy
  has_many :tools, dependent: :destroy
  has_many :comments, dependent: :destroy
  has_many :contents, dependent: :destroy
  has_many :likes, dependent: :destroy

  def self.taskRankingTop3
    find(Like.group(:task_id).select(:task_id).order('count(task_id) desc').limit(3).pluck(:task_id))
  end
end
