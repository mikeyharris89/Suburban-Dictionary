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
      <li>
        <Link to={"/terms/" + this.props.term.id}>{this.props.term.name}</Link>&nbsp;
        <button onClick={this.editTerm}>Edit</button>&nbsp;
        <button onClick={this.deleteTerm}>Delete</button>
      </li>
    );
  }
});

module.exports = TermIndexItem;
