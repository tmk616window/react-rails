class User < ApplicationRecord
  has_secure_password
  
  has_many :tasks, dependent: :destroy
  validates :name, presence: true
  validates :email, presence: true
  validates :password_digest, presence: true
end
