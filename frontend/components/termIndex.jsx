var React = require('react'),
    TermStore = require('../stores/term_store'),
    ClientActions = require('../actions/client_actions'),
    TermIndexItem = require('./termIndexItem');


var TermIndex = React.createClass({
  getInitialState: function () {
    return ({ terms: TermStore.all() });
  },

  componentDidMount: function () {
    this.listener = TermStore.addListener(this.getTerms);
    ClientActions.fetchTerms();
  },

  componentWillUnmount: function () {
    this.listener.remove();
  },

  getTerms: function () {
    this.setState({ terms: TermStore.all()});
  },


  render: function () {
    return(
      <div className="content">

        <ul>

        {
          this.state.terms.reverse().map(function(term){
            return (<TermIndexItem key={term.id} term={term}/>);
          })
        }

        </ul>
      </div>
    );
  }
});

module.exports = TermIndex;
