var React = require('react'),
    TermStore = require('./stores/term_store'),
    ClientActions = require('./actions/client_actions');

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
      <div className="term-index">
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
