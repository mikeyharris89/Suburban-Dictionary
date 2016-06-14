var React = require('react');
var TermStore = require('../stores/term_store.js');
var ClientActions = require('../actions/client_actions.js');
var Link = require('react-router').Link;
var TermIndexItem = require('./termIndexItem');
var LikeNameIndex = require('./likeNameIndex');

var TermShow = React.createClass({
  getInitialState: function () {
    var potentialTerm = TermStore.find(this.props.params.termId);
    return ({term: potentialTerm ? potentialTerm : {}});
  },

  componentDidMount: function () {
    this.termListener = TermStore.addListener(this.handleChange);
    ClientActions.getTerm(parseInt(this.props.params.termId));
  },

  componentWillUnmount: function () {
    this.termListener.remove();
  },

  componentWillReceiveProps: function(newProps) {
    ClientActions.getTerm(parseInt(newProps.params.termId));
  },

  handleChange: function () {
    var potentialTerm = TermStore.find(this.props.params.termId);
    this.setState({ term: potentialTerm ? potentialTerm : {} });
  },

  render: function () {

    var result = "";
    var term = this.state.term;

    return (
      <div className="content">
        <TermIndexItem key={term.id} term={term}/>
        <LikeNameIndex name={term.name} id={term.id}/>
      </div>

    );
  }
});

module.exports = TermShow;
