#SuburbanDictionary

[Heroku link][heroku]
[heroku]: http://suburbandictionary.herokuapp.com

## Minimum Viable Product

SuburbanDictionary is a Safe For Work (SFW) website inspired by UrbanDictionary that will be built using Ruby on Rails and React.js. By the end of Week 9, this app will satisfy the minimum criteria:

- [ ] New account creation, login, and guest/demo login
- [ ] An easy to use and bug-free navigation
- [ ] Adequate seed data to demonstrate the site's features
- [ ] The minimum features to get a working version of the site: creating custom words that can be posted and edited, a homepage displaying words, a word page that displays multiple definitions a browse menu to find words, a search bar to find words.
- [ ] Hosting on Heroku
- [ ] CSS styling that is satisfactorily visually appealing
- [ ] A production README, replacing this README

## Product Goals and Priorities

Suburban dictionary will be cool enough to allow a user to:

- [ ] Create an account (MVP)
- [ ] Log in / Log out, including as a Guest/Demo User (MVP)
- [ ] Create, read, update, and delete definitions (MVP)
- [ ] Rank definitions by giving a thumbs up or thumbs down on definitions
- [ ] Organize words into index page by character
- [ ] Search for definitions alphabetically, or by typing into a search bar(MVP)

- [ ] Favorites section to see your faves and the most favorite on the site

## Design Docs
* [View Wireframes][views]
* [React Components][components]
* [Flux Cycles][flux-cycles]
* [API endpoints][api-endpoints]
* [DB schema][schema]

[views]: ./docs/views.md
[components]: ./docs/components.md
[flux-cycles]: ./docs/flux-cycles.md
[api-endpoints]: ./docs/api-endpoints.md
[schema]: ./docs/schema.md

## Implementation Timeline

### Phase 0: Organization (.5 day)
- [ X ] get clarification on website. Are various indexes different components?
Or related.
- [ X ] seems like a word can have many definitions, but each word instance is a
different, and has its own definition attribute.
- [ X ] How do we group words together. WordDetailItem? Is this a necessary feature, or should we just have a show page for the word.

### Phase 1: Backend setup and User Authentication (0.5 days)

**Objective:** Functioning rails project with Authentication

- [ X ] create `User` model
- [ X ] authentication
- [ X ] user signup/signin pages
- [ X ] blank landing page after signin
- [ X ] css style signup/signin pages

### Phase 2: Words Model, API, and basic APIUtil (1.5 days)

**Objective:** Words can be created, read, edited and destroyed through
the API.

- [ X ] create `Word` model
- [ X ] seed the database with a small amount of test data
- [ X ] CRUD API for words (`WordsController`)
- [ X ] jBuilder views for words
- [ X ] setup Webpack & Flux scaffold
- [ X ] setup `APIUtil` to interact with the API
- [ X ] test out API interaction in the console.
- [ X ] begin styling CRUD components

### Phase 3: Flux Architecture and Router (1.5 days)

**Objective:** Words can be created, read, edited and destroyed with the
user interface.

- [ X ] setup the flux loop with skeleton files
- [ X ] setup React Router
- [ X ] implement each word component, building out the flux loop as needed.
  - [ X ] `WordsIndex`
  - [ X ] `WordIndexItem`
  - [ ] `WordForm`
- [ ] Tighten up styling for CRUD components

### Phase 4: Like/Dislike Button (0.5 days)

**Objective:** Allow words to keep track of likes/dislikes. Will be used to organize words with multiple definitions.

- [ ] Give like/dislike buttons to posts
- [ ] Buttons change state of words, will organize the words based on this later
- [ ] add basic colors & styles
- [ ] create algorithm to determine ratio between likes dislikes, to be able to
sort the same word

### Phase 5: Search/Browse (1.5 day)

**Objective:** Create Working search bar to navigate page. Also create index
page that filters words by letter.

- build out API, Flux loop, and components for `Search`:
  - [ ] SearchBar filters results and shows matching words
  - [ ] display page if no words match word
  - [ ] onClick brings users to Word show page
- Use CSS to style search views

- [ ] create `CharacterIndex` component
- build out API, Flux loop, and components for:
  - [ ] `CharacterIndex` displays index page based on character
  - [ ] Each `CharacterIndexItem` links to a word show page
- Use CSS to character index page


### Phase 6: Related Posts? (2 days)

**Objective:** Organize words based upon likes, not sure how this logic will work. On words shoe page, need to show other words with same name, sort based on
like to dislike ratio.

- [ ] WordDetailIndex displays clicked word, as well as other words with same name:
  - [ ] upon click of other definition, worddetailitems are rearranged on page
  - [ ] Only displays one word, if it is the only one of its kind
- [ ] Style new elements


### Phase 7: Styling Cleanup and Seeding (1 day)

**objective:** Make sure the site is styled correctly and bug free.

- [ ] Get feedback on my UI from others
- [ ] Refactor HTML classes & CSS rules
- [ ] Add modals, transitions, and other styling flourishes.

### Bonus Features (TBD)
- [ ] Shuffle Posts
- [ ] Pronunciation
- [ ] Trending Words
- [ ] Favorites List
- [ ] Upload Pictures/Gifs

[phase-one]: ./docs/phases/phase1.md
[phase-two]: ./docs/phases/phase2.md
[phase-three]: ./docs/phases/phase3.md
[phase-four]: ./docs/phases/phase4.md
[phase-five]: ./docs/phases/phase5.md
[phase-six]: ./docs/phases/phase6.md
