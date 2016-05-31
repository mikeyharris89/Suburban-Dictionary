# API Endpoints

## HTML API

### Root

- `GET /` - loads React web app

### Users

- `GET /users/new`
- `POST /users`
- `PATCH /users`

### Session

- `GET /session/new`
- `POST /session`
- `DELETE /session`

## JSON API

### Words

- `GET /api/words`
  - Words index/search
  - accepts `char_name` query param to list notes by char
- `POST /api/words`
- `GET /api/words/:id`
- `PATCH /api/words/:id`
- `DELETE /api/words/:id`

## TODO
- `Not sure here if i'm missing something here, to show a page based on the index
do i need separate routes? or is the index going to just be filtered, and will display
links based on the character used to filter the words`
<!-- ### Tags

- A note's tags will be included in the note show template
- `GET /api/tags`
  - includes query param for typeahead suggestions
- `POST /api/notes/:note_id/tags`: add tag to note by name
  - if note doesn't already exist, it will be created
- `DELETE /api/notes/:note_id/tags/:tag_name`: remove tag from note by
  name -->
