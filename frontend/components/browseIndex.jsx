var React = require('react');
var TermStore = require('../stores/term_store.js');
var ClientActions = require('../actions/client_actions.js');
var Link = require('react-router').Link;
var TermIndexItem = require('./termIndexItem');

var BrowseIndex = React.createClass({
  getInitialState: function () {
    return ({ terms: [] });
  },

  componentDidMount: function() {
    this.termListener = TermStore.addListener(this.handleChange);
    ClientActions.fetchBrowseTerms(this.props.letter);
  },

  componentWillUnmount: function() {
    this.termListener.remove()
  },

  componentWillReceiveProps: function(newProps){

  },

  handleChange: function () {
    this.setState( terms: TermStore.browseTerms)
  }

});

module.exports = BrowseIndex;
