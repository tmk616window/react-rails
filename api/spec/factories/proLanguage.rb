FactoryBot.define do
  factory :ProLanguage do
    language {"language"}
    task_id {FactoryBot.create(:task).id}
  end
end