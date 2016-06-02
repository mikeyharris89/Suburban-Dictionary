var React = require('react'),
  TermStore = require('../stores/term_store'),
  SessionStore = require('../stores/session_store'),
  ClientActions = require('../actions/client_actions');

var TermForm = React.CreateClass({
  getInitialState: function() {
    return({ name: "", definition: "", sentence: ""})
  }

  nameChange: function (e) {
    this.setState( { name: e.target.value} );
  },

  definitionChange: function (e) {
    this.setState( { definition: e.target.value} );
  },

  sentenceChange: function (e) {
    this.setState( { sentence: e.target.value} );
  },

  handleSubmit: function(e) {
    var data = {
      name: this.state.name,
      definition: this.state.definition,
      sentence: this.state.sentence,
      user_id: SessionStore.currentUser.id
    }
    ClientActions.createTerm(data);
    this.setState({ name: "", definition: "", sentence: ""});
  }

  render: function() {
    render(
      <div>
        <h3>NEW FORM</h3>
        <form onSubmit={this.handleSubmit}>
          <div className= "inner-modal">
            <div className="help-block">All the definitions on
              <b> Suburban Dictionary </b>
              were written by people just like you. Now's your chance to
              add your own! Add your classic, white-washed suburban terms.
            </div>

            <input className="term-name" placeholder="Word"></input>
            <div className="help-block">
              <b>Write for a large audience. </b>
              Everyone and their mother will be reading this, so provide some
              background information.
              <b>Don't be inappropriate! </b>
              Mikey is trying to get a job. So be funny with your defintions,
              but let's try to be SFW.
            </div>
            <input
              classname= "term-definition"
              placeholder="Type your definition here..."
              />
            <input>
            classname= "term-definition"
            placeholder="Type your definition here..."
            </input>
            <div className= "disclaimer"/>
          </div>
        </form>
      </div>
    );
  }
});

module.exports = TermStore;
