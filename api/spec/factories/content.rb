FactoryBot.define do
  factory :content do
    title {"test"}
    text {"test"}
    task_id {FactoryBot.create(:task).id}
  end
end


