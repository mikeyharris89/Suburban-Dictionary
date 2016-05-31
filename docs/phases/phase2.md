# Phase 2: Flux Architecture and Word CRUD (2 days)

## Rails
### Models

### Controllers

### Views

## Flux
### Views (React Components)
* WordsIndex
  - WordsIndexItem
* WordForm

### Stores
* Word

### Actions
* ApiActions.receiveAllWords -> triggered by ApiUtil
* ApiActions.receiveSingleWord
* ApiActions.deleteWord
* WordActions.fetchAllWords -> triggers ApiUtil
* WordActions.fetchSingleWord
* WordActions.createWord
* WordActions.editWord
* WordActions.destroyWord

### ApiUtil
* ApiUtil.fetchAllWords
* ApiUtil.fetchSingleWord
* ApiUtil.createWord
* ApiUtil.editWord
* ApiUtil.destroyWord

## Gems/Libraries
* Flux Dispatcher (npm)
