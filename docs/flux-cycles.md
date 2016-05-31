## Word Cycles

### Words API Request Actions

* `fetchAllWords`
  0. invoked from `WordsIndex` `didMount`/`willReceiveProps`
  0. `GET /api/words` is called.
  0. `receiveAllWords` is set as the callback.

* `createWord`
  0. invoked from new note button `onClick`
  0. `POST /api/words` is called.
  0. `receiveSingleWord` is set as the callback.

* `fetchSingleWord`
  0. invoked from `WordDetail` `didMount`/`willReceiveProps`
  0. `GET /api/words/:id` is called.
  0. `receiveSingleWord` is set as the callback.

* `updateWord`
  0. invoked from `WordForm` `onSubmit`
  0. `POST /api/words` is called.
  0. `receiveSingleWord` is set as the callback.

* `destroyWord`
  0. invoked from delete note button `onClick`
  0. `DELETE /api/words/:id` is called.
  0. `removeWord` is set as the callback.

### Words API Response Actions

* `receiveAllWords`
  0. invoked from an API callback.
  0. `Word` store updates `_words` and emits change.

* `receiveSingleWord`
  0. invoked from an API callback.
  0. `Word` store updates `_words[id]` and emits change.

* `removeWord`
  0. invoked from an API callback.
  0. `Word` store removes `_words[id]` and emits change.

### Store Listeners

* `WordsIndex` component listens to `Word` store.
* `WordDetail` component listens to `Word` store.

## CharacterIndex Cycles

* `fetchFiltered`
  0. invoked from `CharacterIndex` `onChange` when there is text
  0. `GET /api/words` is called with `character` param.
  0. `receiveFilteredWords` is set as the callback.

* `receiveFilteredWords`
  0. invoked from an API callback.
  0. `FilteredWords` store updates `_filteredWords` and emits change.

* `removeFilteredWords`
  0. invoked from `CharacterIndex` `onChange` when empty
  0. `FilteredWords` store resets `_filteredWords` and emits change.

### Store Listeners

* `CharacterIndex` component listens to `FilteredWords` store.


## SearchSuggestion Cycles

* `fetchSearchSuggestions`
  0. invoked from `WordSearchBar` `onChange` when there is text
  0. `GET /api/words` is called with `text` param.
  0. `receiveSearchSuggestions` is set as the callback.

* `receiveSearchSuggestions`
  0. invoked from an API callback.
  0. `SearchSuggestion` store updates `_suggestions` and emits change.

* `removeSearchSuggestions`
  0. invoked from `WordSearchBar` `onChange` when empty
  0. `SearchSuggestion` store resets `_suggestions` and emits change.

### Store Listeners

* `SearchBarSuggestions` component listens to `SearchSuggestion` store.
