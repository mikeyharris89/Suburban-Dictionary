json.array! @terms do |term|
  json.partial!('term', term: term)
  json.username term.user.username
end
