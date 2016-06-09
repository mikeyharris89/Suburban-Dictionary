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

  matches: function() {
    matches = [];

    this.state.terms.forEach(function(term) {
      var sub = term.name.slice(0, this.state.inputVal.length);
      if (sub.toLowerCase() === this.state.inputVal.toLowerCase()){
        matches.push(term);
      }
    }.bind(this));

    return matches;
  },
  showDropDown: function() {
    this.setState( { hiddenDrop: false });
  },

  selectName: function() {

    this.setState({inputVal: "", terms: [], hiddenDrop: true });
    ClientActions.fetchSearchTerms("");
    this.context.router.push("/terms/" + arguments[0]);
  },

  // handleKeyStroke: function (e) {
  //   var key = e.keyCode,
  //       if ( key != 40 && key != 38 ) return;
  //
  //       if ( key == 40 ) // Down key
  //       var
  //       {
  //           if ( ! $selected.length || $selected.is(':last-child') ) {
  //               $current = $listItems.eq(0);
  //           }
  //           else {
  //               $current = $selected.next();
  //           }
  //       }
  //       else if ( key == 38 ) // Up key
  //       {
  //           if ( ! $selected.length || $selected.is(':first-child') ) {
  //               $current = $listItems.last();
  //           }
  //           else {
  //               $current = $selected.prev();
  //           }
  //       }
  //
  //       $current.addClass('selected');
  //   });​  },
  //

  render: function() {
    var results = this.matches().map(function(match, i) {
      return (
        <li className="search-result-item" key={i} onClick={this.selectName.bind(this, match.id, match.name)}>{match.name}</li>
      );
    }.bind(this));

    return (
    <div>
      <input className="search-bar" placeholder="Type any word here..." onFocus= {this.showDropDown} onChange={this.handleInput} value={this.state.inputVal}/>
      <ul onKeyDown={this.handleKeyStroke} className="search-result" hidden={this.state.dropDown}>
        {results}
      </ul>
    </div>

    );
  }
});

module.exports = SearchBar;
