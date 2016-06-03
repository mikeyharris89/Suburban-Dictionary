
var React = require('react');
var TermStore = require('../stores/TermStore.js');
var ClientActions = require('../actions/clientActions.js');
var Link = require('react-router').Link;
var TermIndexItem = require('./termIndexItem');

var likeNameIndex= React.createClass({
  getInitialState: function() {
    return ( {terms: [] });
  },

  componentDidMount: function() {

    this.termListener = TermStore.addListener(this.handleChange);
    ClientActions.fetchLikeNameTerms(this.props.name);
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

module.exports = TermShow;
