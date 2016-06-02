var React = require('react'),
  TermStore = require('../stores/term_store'),
  SessionStore = require('../stores/session_store'),
  ClientActions = require('../actions/client_actions'),
  ReactRouter = require('react-router');

var TermForm = React.createClass({
  getInitialState: function() {
    return({ name: "", definition: "", sentence: ""});
  },

  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  nameChange: function (e) {
    this.setState( { name: e.target.value} );
  },

  definitionChange: function (e) {
    this.setState( { definition: e.target.value} );
  },

  sentenceChange: function (e) {
    this.setState( { sentence: e.target.value} );
  },

  handleClick: function(e) {

    this.props.close();
    // this.context.router.push("/");
  },

  handleSubmit: function(e) {
    var data = {
      name: this.state.name,
      definition: this.state.definition,
      sentence: this.state.sentence,
      user_id: SessionStore.currentUser.id
    };

    ClientActions.createTerm(data);
    this.setState({ name: "", definition: "", sentence: ""});
    this.context.router.push("/");
  },

  // stopProp: function(e){
  //   e.stopPropagation();
  // },

  render: function() {
    var modalType = "modal";
    if (!this.props.hidden){
      modalType = "modal-is-active";
    }
    return(
      <div className={ modalType + " modal-screen"}>
        <h3>NEW FORM</h3>
        <form onSubmit={this.handleSubmit}>
          <div className="modal-content">
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
              <br></br>
              <b>Don't be inappropriate! </b>
              Mikey is trying to get a job. So be funny with your defintions,
              but let's try to be SFW.
            </div>
            <input
              className= "term-definition"
              placeholder="Type your definition here..."
              />
            <input
            className= "term-sentence"
            placeholder="Type an example of how it's used in a sentence..."
            />
            <div className= "disclaimer">Definitions are subject to our terms of
            service and privacy policay.</div>
          </div>
        </form>
        <a onClick={this.handleClick} className="close-modal">X</a>
      </div>
    );
  }
});

module.exports = TermForm;
