var React = require('react');
var TermStore = require('../stores/termStore.js');
var ClientActions = require('../actions/clientActions.js');
var Link = require('react-router').Link;

var TermShow = React.createClass({
  getInitialState: function () {
    var potentialTerm = TermStore.find(this.props.params.termId);
    return ({term: potentialTerm ? potentialTerm : {}});
  },

  componentDidMount: function () {
    this.termListener = TermStore.addListener(this.handleChange);
    ClientActions.getTerm(parseInt(this.props.params.termId));
  },

  componentWillUnmount: function () {
    this.termListener.remove();
  },

  handleChange: function () {
    var potentialTerm = TermStore.find(this.props.params.termId);
    this.setState({ term: potentialTerm ? potentialTerm : {} });
  },

  render: function () {
    var term = this.state.term;
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

module.exports = TermShow;
