var React = require('react'),
  TermStore = require('../stores/term_store'),
  SessionStore = require('../stores/session_store'),
  ClientActions = require('../actions/client_actions'),
  ReactRouter = require('react-router'),
  ErrorStore = require('../stores/error_store');

var EditForm = React.createClass({
  getInitialState: function() {
    return({
      name: this.props.term.name,
      definition: this.props.term.definition,
      sentence: this.props.term.sentence
    });
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
      user_id: SessionStore.currentUser().id,
      id: this.props.term.id
    };

    ClientActions.editTerm(data);
    this.setState({ name: "", definition: "", sentence: ""});
    this.props.close();
    // this.context.router.push("/");
  },

  fieldErrors: function (field) {
    var errors = ErrorStore.formErrors(this.formType());
    if (!errors[field]) { return; }

    var messages = errors[field].map(function (errorMsg, i) {
      return <li key={ i }>{ errorMsg }</li>;
    });

    return <ul>{ messages }</ul>;
  },

  render: function() {
    var modalType = "modal";
    if (!this.props.hidden){
      modalType = "modal-is-active";
    }
    return(
      <div className={ modalType + " modal-screen"}>
        <div className="modal-header">
          <span className="modal-title">EDIT WORD</span>
        </div>
        <form onSubmit={this.handleSubmit}>
          <div className="modal-content">
            <div className="help-block">All the definitions on
              <b> Suburban Dictionary </b>
              were written by people just like you. Nows your chance to
              add your own! Add your classic, white-washed suburban terms.
            </div>

            <input
            className="term-name input-box"
            placeholder="Word"
            value={this.state.name}
            onChange={this.nameChange}
            />
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
              className= "term-definition input-box"
              placeholder="Type your definition here..."
              value={this.state.definition}
              onChange={this.definitionChange}
              />
            <input
            className= "term-sentence input-box"
            placeholder="Type an example of how it's used in a sentence..."
            value={this.state.sentence}
            onChange={this.sentenceChange}
            />
            <div className= "disclaimer">Definitions are subject to our terms of
            service and privacy policay.</div>
          </div>
          <button className="submit" type="submit">Submit!</button>
        </form>
        <a onClick={this.handleClick} className="close-modal">x</a>
      </div>
    );
  }
});

module.exports = EditForm;
