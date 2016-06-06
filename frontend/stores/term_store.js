var AppDispatcher = require('../dispatcher/dispatcher'),
    ClientActions = require('../actions/client_actions'),
    TermConstants = require('../constants/term_constants'),
    Store = require('flux/utils').Store;

var TermStore = new Store(AppDispatcher);

var _terms = {};

TermStore.all = function() {

  var terms = [];

  Object.keys(_terms).forEach(function(key){
    terms.push(_terms[key]);
  });
  return terms;
};

TermStore.likeNames = function(id){
  var likeNames = [];
  Object.keys(_terms).forEach(function(key){
    if (_terms[key].id !== id){
      likeNames.push(_terms[key]);
    }
  });
  return likeNames;
};

TermStore.find = function(id) {
  return _terms[id];
};

var resetTerms = function(terms) {
  _terms = {};
  terms.forEach(function(term) {
    _terms[term.id] = term;
  });

};

var setTerm = function(term){
  _terms[term.id] = term;
};

var removeTerm = function(term){
  debugger
  delete _terms[term.id];
  debugger
};

TermStore.__onDispatch = function(payload) {

  switch(payload.actionType){
    case(TermConstants.RECEIVED_TERMS):
      resetTerms(payload.terms);
      break;
    case(TermConstants.RECEIVED_TERM):
      setTerm(payload.term);
      break;

    case(TermConstants.REMOVED_TERM):
      removeTerm(payload.term);
      break;
  }
  this.__emitChange();

};

window.TermStore = TermStore;
module.exports = TermStore;
