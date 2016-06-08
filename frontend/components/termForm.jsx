var React = require('react'),
  TermStore = require('../stores/term_store'),
  SessionStore = require('../stores/session_store'),
  ClientActions = require('../actions/client_actions'),
  ReactRouter = require('react-router'),
  ErrorStore = require('../stores/error_store');

var TermForm = React.createClass({
  getInitialState: function() {
    return({
      name: "",
      definition: "",
      sentence: "",
      imageFile: null,
      imageUrl: null
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

  handleClick: function(e) {
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

  handleSubmit: function(e) {
    var formData = new FormData();
    formData.append("term[name]", this.state.name);
    formData.append("term[definition]", this.state.definition);
    formData.append("term[sentence]", this.state.sentence);
    formData.append("term[user_id]", SessionStore.currentUser().id);
    formData.append("term[image]", this.state.imageFile);
    ClientActions.createTerm(formData);

    // var data = {
    //   name: this.state.name,
    //   definition: this.state.definition,
    //   sentence: this.state.sentence,
    //   user_id: SessionStore.currentUser().id
    // };
    //
    // ClientActions.createTerm(data);
    this.setState({ name: "", definition: "", sentence: "", imageFile: null});
    this.props.close();
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
            <div className= "disclaimer">Definitions are subject to our terms of
            service and privacy policay.</div>
            <img src={this.state.imageUrl}/>
          </div>
          <button className="submit" type="submit">Submit!</button>
        </form>
        <a onClick={this.handleClick} className="close-modal">x</a>
      </div>
    );
  }
});

module.exports = TermForm;
