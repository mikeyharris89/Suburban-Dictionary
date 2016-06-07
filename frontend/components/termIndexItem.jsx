var React = require('react'),
    Link = require('react-router').Link,
    ClientActions = require('../actions/client_actions'),
    hashHistory = require('react-router').hashHistory,
    SessionStore = require('../stores/session_store'),
    EditForm = require('./termEdit');

var TermIndexItem = React.createClass({
  getInitialState: function() {
    return { hiddenEdit: true };
  },

  openEdit: function () {
    this.setState({ hiddenEdit: false });
  },

  closeEdit: function () {
    this.setState({ hiddenEdit:  true });
  },

  deleteTerm: function(e) {
    e.preventDefault();
    ClientActions.deleteTerm(this.props.term.id);
    hashHistory.push("/");
  },

  handleClick: function(e) {
    e.preventDefault();

  },

  render: function() {
    var buttons = "";
    if (parseInt(this.props.term.user_id) === SessionStore.currentUser().id) {
      buttons =
      <div className= "group button-bar">
        <button className="term-change" onClick={this.openEdit}>Edit</button>
        <button className="term-change" onClick={this.deleteTerm}>Delete</button>
      </div>;
    }
    return (
      <div className="def-panel">
        <div>
          <div className="date-head">{this.props.term.date_head}</div>
        </div>
        <Link to={"/terms/" + this.props.term.id} className="term-name">{this.props.term.name}</Link>&nbsp;
        <div className="definition">{this.props.term.definition}</div>
        <div className="sentence">{this.props.term.sentence}</div>
        <div className="contributor">by
            <Link to={"/users/" + this.props.term.user_id} className="term_author">
              {this.props.term.username}
            </Link>
            {this.props.term.date_string}
        </div>

        {buttons}
        <EditForm hidden={this.state.hiddenEdit} close={this.closeEdit} term={this.props.term}/>
      </div>
    );
  }
});

module.exports = TermIndexItem;
