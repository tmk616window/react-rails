class User < ApplicationRecord
  has_secure_password
  mount_uploader :image, ImageUploader

  has_many :tasks, dependent: :destroy
  has_many :likes, dependent: :destroy
  has_many :comments, dependent: :destroy
  has_many :chat_messages, dependent: :destroy
  has_many :entries, dependent: :destroy

  validates :name, presence: true
  validates :email, presence: true
  validates :password_digest, presence: true
end
