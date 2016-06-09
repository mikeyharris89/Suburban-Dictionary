var React = require('react');
var Link = require('react-router').Link;
var SessionStore = require('../stores/session_store');
var SessionApiUtil = require('../util/session_api_util');
var TermForm = require('./termForm');
var SearchBar = require('./searchBar');
var TermStore = require('../stores/term_store');
var ClientActions = require('../actions/client_actions');

var App = React.createClass({
  getInitialState: function() {
    return ({ hiddenForm: true });
  },

  componentDidMount: function () {
    SessionApiUtil.fetchCurrentUser();
    SessionStore.addListener(this.forceUpdate.bind(this));
  },

  openForm: function () {
    if (!SessionStore.isUserLoggedIn()){
      this.context.router.push("login");
    } else {
    this.setState({ hiddenForm:  false });
    }
  },

  closeForm: function () {
    this.setState({ hiddenForm:  true });

  },

  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  clickHome: function() {
    this.context.router.push("/");
  },
  userSignIn: function() {
    var path = "login";
    if (SessionStore.isUserLoggedIn()){
      var userId = SessionStore.currentUser().id;
      path = "users/" + userId;
    }
    this.context.router.push(path);
  },
  greeting: function(){
    if (SessionStore.isUserLoggedIn()) {
    	return (
    		<hgroup>
    			<h2>Hi, {SessionStore.currentUser().username}!</h2>
    			<input className="logout" type="submit" value="logout" onClick={ SessionApiUtil.logout } />
    		</hgroup>
    	);
    } else if (["/login", "/signup"].indexOf(this.props.location.pathname) === -1) {
      return (
        <nav>
          <Link to="/login" activeClassName="current">Login</Link>
          &nbsp;or&nbsp;
          <Link to="/signup" activeClassName="current">Sign up!</Link>
        </nav>
      );
    }
  },

  randomClick: function() {
    ClientActions.fetchForRandom(this.randomPage);
  },

  randomPage: function () {
    var terms = TermStore.all();
    var termId = terms[Math.floor(Math.random() * terms.length)].id;
    this.context.router.push("terms/" + termId);
  },

  render: function() {
    // <input className="search-bar" placeholder="Type any word here..."/>
    return (
      <div>
        <header className="suburban-top-bar group">
          <nav className="top-bar group">
          <ul className= "header-logo">
            <a href="/" className="logo">
              <img src="assets/logo.png" alt=""/>
            </a>
          </ul>
            <ul className="main-nav">
            </ul>
          </nav>
          <nav className="bottom-bar group">
            <div className="main-search">
              <SearchBar/>
            </div>
            <div className="right-search">
              <ul className="nav-buttons">
                <button onClick={ this.openForm}>
                  <i className="fa fa-plus" aria-hidden="true"></i>
                </button>

                <button>
                <i className="fa fa-random" onClick={this.randomClick} aria-hidden="true"></i>
                </button>

                <button onClick = { this.userSignIn }>
                  <i className="fa fa-user" aria-hidden="true"></i>
                </button>
              </ul>
            </div>
          </nav>
        </header>
        {this.props.children}

        <TermForm hidden={this.state.hiddenForm} close={this.closeForm}/>
      </div>
    );
  }
});

// {this.greeting()}
module.exports = App;


// <li>Browse</li>
// <li>Favorites</li>
// <li>Magic</li>
