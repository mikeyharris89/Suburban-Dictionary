# SubUrban Dictionary

[SubUrban Dictionary Live][heroku]

[heroku]: http://suburbandictionary.herokuapp.com

SubUrban Dictionary is a full-stack web application, clean-version of the website Urban Dictionary. It implements Ruby on Rails on the backend, a PostgreSQL database, and React.js with a Flux architectural framework on the frontend.

## Feature and Implementation

### Single-Page App
SubUrban Dictionary is a complete, single-page app, that allows all content to be displayed on a single-static page. The home page listens to a 'SessionsStore', and allows functionality based upon a call to 'SessionStore.currentUser()'. Certain parts of the frontend are protected by obtaining the current user by accessing the session controller.

### Sorting Terms
The tricky part of Urban Dictionary, is that there are lot of different ways to view definitions.
There is the home page which lists definitions by date, the show page which displays the
the term you click on and then all of the similar terms below, and then a browse page which shows the
words filtered based on, whichever letter was clicked on. In order to mimic this functionality
I had to create separate flux cycles, depending on what action I wanted to invoke. This
made the single-page aspect of the site kind of difficult, because sometimes the
term stores I needed to access, weren't automatically updated when a component mounted on the page.
I achieved a lot of the sorting using SQL queries on the backend, and made sure to rid my program of
O(n+1) queries by using includes and prefetching data.

```ruby
class Api::TermsController < ApplicationController

  def index
    @terms = Term.order(created_at: :desc).includes(:user)
  end

  def like_name_index
    term = Term.find(params[:id])
    id = params[:id]
    if term
      @terms = Term.where('lower(name) = ?', term.name.downcase).includes(:user)
    end

    render :index
  end
end
```

##Features

* Create a user, or sign-up/sign-in with Facebook
* Add Terms, with option of adding a picture
* Full CRUD capabilities of SubUrban Dictionary terms
* View all posts by any user
* Visit page of search term, and all like name search terms
* Search Bar to find terms
* Button to visit random term page


#Todo

In addition to the features you currently see, I plan on implementing additional
ones to make my site resemble Urban Dictionary even more.

- [ ] Page to browse terms by first letter
- [ ] Pagination
- [ ] Rank definitions by giving a thumbs up or thumbs down on definitions
- [ ] Order posts by rank
- [ ] Ability to add pronunciation
- [ ] Favorites section to see your faves and the most favorite on the site
- [ ] Share definitions on facebook/twitter
