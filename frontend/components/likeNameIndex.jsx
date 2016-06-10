
var React = require('react');
var TermStore = require('../stores/term_store.js');
var ClientActions = require('../actions/client_actions.js');
var Link = require('react-router').Link;
var TermIndexItem = require('./termIndexItem');

var LikeNameIndex = React.createClass({
  getInitialState: function() {
    return ( {terms: [] });
  },

  componentDidMount: function() {
    this.termListener = TermStore.addListener(this.handleChange);
    if (this.props.id){
      ClientActions.fetchLikeNameTerms(this.props.id);
    }
  },

  componentWillUnmount: function() {
    this.termListener.remove();
  },

  componentWillReceiveProps: function(newProps){
    if (newProps.id && newProps.id !== this.props.id) {
      ClientActions.fetchLikeNameTerms(newProps.id);
    }
  },

  handleChange: function () {
    this.setState( {terms: TermStore.likeNames(this.props.id)});
  },

  render: function () {
    return (
      <div className="content">

        <ul>

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

module.exports = LikeNameIndex;
