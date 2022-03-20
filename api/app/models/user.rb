class User < ApplicationRecord
  has_secure_password
  
  has_many :tasks, dependent: :destroy
  has_many :likes
  validates :name, presence: true
  validates :email, presence: true
  validates :password_digest, presence: true
end
