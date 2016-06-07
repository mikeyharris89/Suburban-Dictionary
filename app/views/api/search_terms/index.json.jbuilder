json.array! @search_terms do |search_term|
  json.extract! search_term, :name, :definition, :sentence, :id, :user_id, :created_at
end
