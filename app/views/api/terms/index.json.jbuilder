# json.total_pages @pages
# json.terms do
#   json.partial! "term", collection: @terms, as: :term
# end
#
#



json.array! @terms do |term|
  json.partial!('term', term: term)
  json.username term.user.username
end
