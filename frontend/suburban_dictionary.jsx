var React = require('react');
var ReactDOM = require('react-dom');

var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;
var hashHistory = ReactRouter.hashHistory;
var LoginForm = require('./components/loginForm');
var App = require('./components/app');
var TermIndex = require('./components/termIndex');
var TermShow = require('./components/termShow');
var UserShow = require('./components/userShow');



var _scrollToTop = function() {
  window.scrollTo(0,0);
};

var router = (
  <Router history={hashHistory} onUpdate={ _scrollToTop }>
    <Route path="/" component={App}>
      <IndexRoute component={ TermIndex } />
      <Route path="login" component={ LoginForm } />
      <Route path="signup" component={ LoginForm } />
      <Route path="terms/:termId" component={ TermShow } />
      <Route path="users/:userId" component={ UserShow } />
    </Route>
  </Router>
);
function _ensureLoggedIn(nextState, replace, asyncDoneCallback) {
  if (SessionStore.currentUserHasBeenFetched()) {
    redirectIfNotLoggedIn();
  } else {
    SessionApiUtil.fetchCurrentUser(redirectIfNotLoggedIn);
  }

  function redirectIfNotLoggedIn() {
    if (!SessionStore.isUserLoggedIn()) {

      replace('/login');
    }
    asyncDoneCallback();
  }
}

document.addEventListener('DOMContentLoaded', function(){
  var root = document.getElementById('content');
  ReactDOM.render(router, root);
});
