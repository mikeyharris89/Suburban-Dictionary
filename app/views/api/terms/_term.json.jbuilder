json.extract!(
  term,
  :name, :definition, :sentence, :id
)
json.date_head term.date
json.date_string term.date_string
json.user_id term.user_id
