json.array! @terms do |term|
  json.extract! term :name, :description, :sentence,
end
