var React = require('react');
var TermStore = require('../stores/term_store.js');
var ClientActions = require('../actions/client_actions.js');
var Link = require('react-router').Link;
var TermIndexItem = require('./termIndexItem');

var BrowseIndex = React.createClass({
  getInitialState: function () {
    return ({ terms: TermStore.browseTerms() });
  },

  componentDidMount: function() {

    this.termListener = TermStore.addListener(this.handleChange);
    ClientActions.fetchBrowseTerms(this.props.params.letter);
  },

  componentWillUnmount: function() {
    this.termListener.remove();
  },

  componentWillReceiveProps: function(newProps){
    ClientActions.fetchBrowseTerms(newProps.params.letter);
  },

  handleChange: function () {
    this.setState( {terms: TermStore.browseTerms()});
  },

  render: function () {
    var result = "";

    if (this.state.terms) {
      result = <ul className="collection-panel">
        <p className="date-head">Words Starting With {this.props.params.letter}</p>
        {this.state.terms.map(function(term, i){
          return <Link to={"/terms/" + term.id} key={i}>{term.name}</Link>;
        })
      }
      </ul>;
    }

    return (
      <div className="content">
        {result}
      </div>
    );
  }
});

module.exports = BrowseIndex;
