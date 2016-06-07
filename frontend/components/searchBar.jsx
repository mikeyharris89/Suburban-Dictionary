var React = require('react'),
    // ReactCSSTransitionGroup = require('react-addons-css-transition-group'),
    ClientActions = require('../actions/client_actions'),
    SearchStore = require('../stores/search_store');

var SearchBar = React.createClass({
  getInitialState: function() {
    return { inputVal: "", terms: [], hiddenDrop: true };
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

  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  handleInput: function(e) {
    ClientActions.fetchSearchTerms(e.target.value);
    this.setState( { inputVal: e.target.value, terms: SearchStore.all()} );

  },

//   handleClick: function(e) {
//     debugger
//     e.preventDefault();
//   //   if (!(e.t)
// },

  matches: function() {
    matches = [];

    this.state.terms.forEach(function(term) {
      var sub = term.name.slice(0, this.state.inputVal.length);
      if (sub.toLowerCase() === this.state.inputVal.toLowerCase()){
        matches.push(term);
      }
    }.bind(this));

    // if (matches.length === 0 ) {
    //   matches.push("No matches!");
    // }

    return matches;
  },
  showDropDown: function() {
    this.setState( { hiddenDrop: false });
  },

  selectName: function() {

    // var name = arguments[1];
    // this.setState({ inputVal: name} );
    this.setState({inputVal: "", terms: []});
    ClientActions.fetchSearchTerms("");
    this.context.router.push("/terms/" + arguments[0]);
  },
  // <ReactCSSTransitionGroup transitionName="auto" transitionEnterTimeout={500} transitionLeaveTimeout={500}>
  // </ReactCSSTransitionGroup>

  render: function() {
    console.log(this.matches());
    var results = this.matches().map(function(match, i) {
      return (
        <li className="search-result-item" key={i} onClick={this.selectName.bind(this, match.id, match.name)}>{match.name}</li>
      );
    }.bind(this));

    return (
    <div>
      <input className="search-bar" onFocus= {this.showDropDown} onChange={this.handleInput} value={this.state.inputVal}/>
      <ul className="search-result" hidden={this.state.dropDown}>
        {results}
      </ul>
    </div>

    );
  }
});

module.exports = SearchBar;
