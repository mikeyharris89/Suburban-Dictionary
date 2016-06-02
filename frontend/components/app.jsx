var React = require('react');
var Link = require('react-router').Link;
var SessionStore = require('../stores/session_store');
var SessionApiUtil = require('../util/session_api_util');

var App = React.createClass({

  componentDidMount: function () {
    SessionApiUtil.fetchCurrentUser();
    SessionStore.addListener(this.forceUpdate.bind(this));
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

  render: function() {
    return (
      <div>
        <header className= "suburban-top-bar">
          <h1>Suburban <br/> Dictionary</h1>
          { this.greeting() }
        </header>
        {this.props.children}
      </div>
    );
  }
});

module.exports = App;
