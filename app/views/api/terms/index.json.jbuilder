json.array! @terms do |term|
  json.extract! term, :name, :definition, :sentence, :id
end
