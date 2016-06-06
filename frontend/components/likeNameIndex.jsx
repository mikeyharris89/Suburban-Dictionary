
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
    debugger
    this.termListener = TermStore.addListener(this.handleChange);
    ClientActions.fetchLikeNameTerms(this.props.id);
  },

  componentWillUnmount: function() {
    this.termListener.remove();
  },

  handleChange: function () {
    this.setState( {terms: TermStore.all()});
  },

  render: function () {
    return ( <div className="content">

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
