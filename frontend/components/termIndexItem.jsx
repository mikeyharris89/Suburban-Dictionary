var React = require('react'),
    Link = require('react-router').Link,
    ClientActions = require('../actions/client_actions'),
    hashHistory = require('react-router').hashHistory;

var TermIndexItem = React.createClass({
  editPost: function (e) {
    e.preventDefault();
    var url = "/terms/" + this.props.term.id + "/edit";
    hashHistory.push(url);
  },

  deletePost: function(e) {
    e.preventDefaults();
    ClientActions.deleteTerm(this.props.term.id);
  },

  render: function() {
    return (
      <div className="def-panel">
        <div>
          <div className="date-head">{this.props.term.date_head}</div>
        </div>
        <Link to={"/terms/" + this.props.term.id} className="term-name">{this.props.term.name}</Link>&nbsp;
        <div className="definition">{this.props.term.definition}</div>
        <div className="sentence">{this.props.term.sentence}</div>
        <div className="contributor">by
            <a className="term_author">{this.props.term.username}</a>
            {this.props.term.date_string}
        </div>
        <div className= "group button-bar">
          <button className="term-change" onClick={this.editTerm}>Edit</button>&nbsp;
          <button className="term-change" onClick={this.deleteTerm}>Delete</button>
        </div>
      </div>
    );
  }
});

module.exports = TermIndexItem;
