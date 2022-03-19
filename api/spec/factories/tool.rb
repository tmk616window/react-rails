FactoryBot.define do
  factory :tool do
    name {"name"}
    task_id {FactoryBot.create(:task).id}
  end
end


