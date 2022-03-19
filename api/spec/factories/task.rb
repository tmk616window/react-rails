FactoryBot.define do
  factory :task do
    title {"task"}
    image {"task"}
    details {"task"}
    url {"task"}
    user_id {FactoryBot.create(:user).id}
  end
end