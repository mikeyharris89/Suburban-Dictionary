json.extract!(
  term,
  :name, :definition, :sentence, :id, :user_id, :created_at
)
json.date_head term.date
json.date_string term.date_string
json.image_url asset_path(term.image.url)
# json.user_id term.user_id
# json.created_at term.created_at
