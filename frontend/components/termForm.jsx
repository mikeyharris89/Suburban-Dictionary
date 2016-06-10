var React = require('react'),
  TermStore = require('../stores/term_store'),
  SessionStore = require('../stores/session_store'),
  ClientActions = require('../actions/client_actions'),
  ReactRouter = require('react-router'),
  ErrorStore = require('../stores/error_store'),
  ErrorActions = require('../actions/error_actions');

var TermForm = React.createClass({
  getInitialState: function() {
    return({
      name: "",
      definition: "",
      sentence: "",
      imageFile: "",
      imageUrl: ""
    });
  },

  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  componentDidMount: function () {
    this.errorListener = ErrorStore.addListener(this.forceUpdate.bind(this));
  },

  componentWillUnmount: function() {
      this.errorListener.remove();
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

  updateFile: function (e) {
    var file = e.currentTarget.files[0];
    var fileReader = new FileReader();
    fileReader.onloadend = function () {
      this.setState({ imageFile: file, imageUrl: fileReader.result });
    }.bind(this);

    if (file) {
      fileReader.readAsDataURL(file);
    }
  },

  fieldErrors: function (field) {
    var errors = ErrorStore.formErrors("create");
    if (!errors[0]) { return; }

    var messages = Object.keys(errors).map(function (key, i) {
      return <li key={ i }>{ errors[key] }</li>;
    });
    return <ul className="errors">{ messages }</ul>;
  },


  closeModal: function () {
    this.setState({ name: "", definition: "", sentence: "", imageFile: "", imageUrl: ""});
    ErrorActions.clearErrors();
    this.props.close();
  },

  handleSubmit: function(e) {
    e.preventDefault();
    var formData = new FormData();
    formData.append("term[name]", this.state.name);
    formData.append("term[definition]", this.state.definition);
    formData.append("term[sentence]", this.state.sentence);
    formData.append("term[user_id]", SessionStore.currentUser().id);
    formData.append("term[image]", this.state.imageFile);
    ClientActions.createTerm(formData, this.closeModal);
  },


  render: function() {
    var modalType = "modal";
    if (!this.props.hidden){
      modalType = "modal-is-active ";
    }
    return(
      <div className={ modalType + " modal-screen group"}>
        <div className="modal-header">
          <span className="modal-title">NEW WORD</span>
        </div>
        <form onSubmit={this.handleSubmit}>
          { this.fieldErrors("errors") }
          <div className="modal-content">
            <div className="help-block">All the definitions on
              <b> Suburban Dictionary </b>
              were written by people just like you. Now's your chance to
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
            <input type="file" onChange={this.updateFile}/>
            <div className="preview">
              <img src={this.state.imageUrl}/>
            </div>
            <div className= "disclaimer">Definitions are subject to our terms of
            service and privacy policy.</div>
          </div>
          <button className="submit" type="submit">Submit!</button>
        </form>
        <a onClick={this.closeModal} className="close-modal">x</a>
      </div>
    );
  }
});

module.exports = TermForm;
