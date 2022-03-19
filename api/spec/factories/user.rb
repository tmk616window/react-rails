FactoryBot.define do
  factory :user do
    sequence(:name) { |n| "test#{n}" }
    sequence(:email) { "test" + SecureRandom.hex(6) + "example.com" }
    password {"password"}
    password_confirmation {"password"}
  end
end