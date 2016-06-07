var React = require('react'),
    ReactCSSTransitionGroup = require('react-addons-css-transition-group'),
    ClientActions = require('../actions/client_actions'),
    SearchStore = require('../stores/search_store');

var SearchBar = React.createClass({
  getInitialState: function() {
    return { inputVal: "", terms: [] };
  },

  componentDidMount: function() {
    this.listener = SearchStore.addListener(this.getTerms);
  },

  componentWillUnmount: function() {
    this.listener.remove();
  },

  getTerms: function() {
    this.setState( {inputVal: this.state.inputVal, terms: SearchStore.all()} ); 
  },

  handleInput: function(e) {
    this.setState( { inputVal: e.target.value} );
    ClientActions.fetchSearchTerms(this.state.inputVal);
  },

  matches: function() {
    matches = [];

    this.state.terms.forEach(function(term) {
      var sub = term.name.slice(0, this.state.inputVal.length);
      if (sub.toLowerCase() === this.state.inputVal.toLowerCase()){
        matches.push(term);
      }
    }.bind(this));

    if (matches.length === 0 ) {
      matches.push("No matches!");
    }

    return matches;
  },

  selectName: function(e) {

  },

  render: function() {
    return (
    <div>
      <input className= "search-bar" onChange={this.handleInput} value={this.state.inputVal}>
        <ul>
        <ReactCSSTransitionGroup transitionName="auto" transitionEnterTimeout={500} transitionLeaveTimeout={500}>
          {results}
        </ReactCSSTransitionGroup>
        </ul>
      </input>
    </div>

    );
  }
});

module.exports = SearchBar;
