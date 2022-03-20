class TaskSerializer
  include JSONAPI::Serializer

  attributes :id, :title
end
