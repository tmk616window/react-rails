FactoryBot.define do
  factory :like do
    task_id {FactoryBot.create(:task).id}
    user_id {FactoryBot.create(:user).id}
  end
end


