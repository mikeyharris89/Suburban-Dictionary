var React = require('react');
var Link = require('react-router').Link;
var SessionStore = require('../stores/session_store');
var SessionApiUtil = require('../util/session_api_util');
var TermForm = require('./termForm');

var App = React.createClass({
  getInitialState: function() {
    return ({ hiddenForm: true });
  },

  componentDidMount: function () {
    SessionApiUtil.fetchCurrentUser();
    SessionStore.addListener(this.forceUpdate.bind(this));
  },

  openForm: function () {
    this.setState({ hiddenForm:  false });
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
  // { this.greeting() }

  render: function() {
    return (
      <div>
        <header className="suburban-top-bar group">
          <nav className="top-bar group">
            <ul className="logo">
              <li onClick={this.clickHome}>Suburban <br/> Dictionary</li>
            </ul>
            <ul className="main-nav">
              <li>Browse</li>
              <li>Favorites</li>
              <li>Magic</li>
            </ul>
          </nav>
          <nav className="bottom-bar group">
            <div className="main-search">
              <input className="search-bar" placeholder="Type any word here..."/>
            </div>
            <div className="right-search">
              <ul className="nav-buttons">
                <button onClick={ this.openForm}>Add Term</button>              </ul>
            </div>
          </nav>
        </header>
        {this.greeting()}
        <div className="column">
          {this.props.children}
        </div>
        <TermForm hidden={this.state.hiddenForm} close={this.closeForm}/>
      </div>
    );
  }
});

module.exports = App;
