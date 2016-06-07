var React = require('react');
var Link = require('react-router').Link;
var SessionApiUtil = require('../util/session_api_util');
var SessionStore = require('../stores/session_store');
var ErrorStore = require('../stores/error_store');
var UserApiUtil = require('../util/user_api_util');

var LoginForm = React.createClass({

  getInitialState: function () {
    return { username: "", password: "" };
  },

  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  usernameChange: function(e) {
    e.preventDefault();
    this.setState({ username: e.target.value });
  },

  passwordChange: function(e) {
    e.preventDefault();
    this.setState({ password: e.target.value });
  },

  componentDidMount: function () {
    this.sessionListener = SessionStore.addListener(this.redirectIfLoggedIn);
    this.errorListener = ErrorStore.addListener(this.forceUpdate.bind(this));
  },

  componentWillUnmount: function () {
    this.errorListener.remove();
    this.sessionListener.remove();
  },

  redirectIfLoggedIn: function () {
    if (SessionStore.isUserLoggedIn()) {
      this.context.router.push("/");
    }
  },

	handleSubmit: function (e) {
		e.preventDefault();

		var formData = {
			username: this.state.username,
			password: this.state.password
		};

    if (this.props.location.pathname === "/login") {
      SessionApiUtil.login(formData);
    } else {
      UserApiUtil.signup(formData);
    }
	},

  fieldErrors: function (field) {
    var errors = ErrorStore.formErrors(this.formType());
    if (!errors[field]) { return; }

    var messages = errors[field].map(function (errorMsg, i) {
      return <li key={ i }>{ errorMsg }</li>;
    });

    return <ul>{ messages }</ul>;
  },

  formType: function () {
    return this.props.location.pathname.slice(1);
  },

	render: function () {
    var navLink;
    if (this.formType() === "login") {
      navLink = <Link to="/signup">sign up instead</Link>;
    } else {
      navLink = <Link to="/login">log in instead</Link>;
    }

		return (
			<form onSubmit={this.handleSubmit}>

        <p className="login">{ this.formType() } or { navLink } to
          <b> post new definitions, images, and sounds </b>
          and create lists of favorites
        </p>
        <p className="errors">
        { this.fieldErrors("errors") }
      </p>

        <br />

        { this.fieldErrors("username") }
				<input
        type="text"
        placeholder="Username"
        value={this.state.username}
        onChange={this.usernameChange}
        />


        <br />

        { this.fieldErrors("password") }
				<input
        type="password"
        placeholder="Password"
        value={this.state.password}
        onChange={this.passwordChange}
        />


        <br />
				<button className="submit" type="submit">Submit!</button>
			</form>
		);
	}
});

module.exports = LoginForm;
