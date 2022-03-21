FactoryBot.define do
  factory :comment do
    text { 'test' }
    task_id { FactoryBot.create(:task).id }
    user_id { FactoryBot.create(:user).id }
  end
end
