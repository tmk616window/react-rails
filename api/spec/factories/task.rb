FactoryBot.define do
  factory :task do
    title { 'task' }
    details { 'task' }
    url { 'task' }
    image { File.open(File.join(Rails.root, 'spec/fixtures/files/test_pic_01.png')) }
    user_id { FactoryBot.create(:user).id }
  end
end
