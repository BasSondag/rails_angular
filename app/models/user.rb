class User < ActiveRecord::Base
  has_secure_password
  email_regex = /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]+)\z/i
  validates :name, :email, :password, :password_confirmation, presence: true , length: {minimum: 3 }
  validates :email, format: {with: email_regex}, uniqueness: {:case_sensitive => false}
  validates :password, confirmation: true
end
