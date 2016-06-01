var AppDispatcher = require('../dispatcher/dispatcher'),
    ClientActions = require('../actions/client_actions'),
    TermConstants = require('../constants/term_actions'),
    Store = require('flux/utils').Store;

var TermStore = new Store();

var _terms = {};

TermStore.all = function() {
  var terms = [];
  Object.keys(_terms).forEach(function(key){
    terms.push(_terms[key]);
  });
  return terms;
};

TermStore.find = function(id) {
  return _terms[id];
};

var resetTerms = function(terms) {
  terms.forEach(function(term) {
    _terms[term.id] = term;
  });
};

var setTerm = function(term){
  _terms[term.id] = term;
};

var removeTerm = function(term){
  delete _terms[term.id];
};

TermStore.__onDispatch = function(payload) {
  switch(payload.actionType){
    case(TermConstants.TERMS_RECEIVED):
      resetTerms(payload.terms);
      break;
    case(TermConstants.TERM_RECEIVED):
      setTerm(payload.term);
      break;
    case(TermConstants.TERM_REMOVED):
      removeTerm(payload.term);
      break;
  }
  this.__emitChange();
};

module.exports = TermStore;
