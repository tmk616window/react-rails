FactoryBot.define do
  factory :user do
    sequence(:name) { |n| "test#{n}" }
    sequence(:email) { |n| "test#{n + 1}@example.com" }
    password {"password"}
    password_confirmation {"password"}
  end
end