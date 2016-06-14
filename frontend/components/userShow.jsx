var React = require('react');
var SessionStore = require('../stores/session_store.js');
var ClientActions = require('../actions/client_actions.js');
var Link = require('react-router').Link;
var TermIndexItem = require('./termIndexItem');
var TermStore = require('../stores/term_store');
var SesssionApiUtil = require('../util/session_api_util');

var UserShow = React.createClass({

  getInitialState: function ()  {
    return ({ terms: [] });
  },

  componentDidMount: function () {
    this.termListener = TermStore.addListener(this.handleChange);
    ClientActions.fetchTerms();
  },

  userTerms: function() {
    var self = this;
    var terms = [];
    var userId = this.props.params.userId || SessionStore.currentUser().id;

    TermStore.all().forEach(function(term) {
      if (term.user_id.toString() === userId){
        terms.push(term);
      }
    });
    return terms;
  },

  componentWillUnmount: function () {
    this.termListener.remove();
  },

  handleChange: function () {
    this.setState({ terms: this.userTerms() });
  },

  render: function () {
    var heading = "";
    var term = this.state.terms[0];
    var userId = this.props.params.userId || SessionStore.currentUser().id;

    if (parseInt(userId) === SessionStore.currentUser().id) {
      heading = <h3 className="group">
                  <p className="heading">Hello {SessionStore.currentUser().username}!</p>
                  <button className="logout" type="submit" onClick={ SessionApiUtil.logout }>LOGOUT</button>
                </h3>;
    } else {
      if (term) {
        heading = <h3>Definitions by {term.username}</h3>;
      }
    }

    return (
      <div className="content group">
      {heading}
        <ul className="index-terms">
        {
          this.state.terms.map(function(term){
            return (<TermIndexItem key={term.id} term={term}/>);
          })
        }
        </ul>
      </div>

    );
  }
});

module.exports = UserShow;
