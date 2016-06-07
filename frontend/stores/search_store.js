var AppDispatcher = require('../dispatcher/dispatcher.js'),
    Store = require('flux/utils').Store,
    SearchConstants = require('../constants/search_constants');


var SearchStore = new Store(AppDispatcher);

var _searchTerms = {};

SearchStore.all = function() {

  var searchTerms = [];

  Object.keys(_searchTerms).forEach(function(key){
    searchTerms.push(_searchTerms[key]);
  });
  searchTerms.sort(function(a, b) {
  var nameA = a.name.toLowerCase();
  var nameB = b.name.toLowerCase();
  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) {
    return 1;
  }
  return 0;
  });

  return searchTerms;
};

var resetTerms = function(terms) {
  _searchTerms = {};
  terms.forEach(function(term) {
    _searchTerms[term.id] = term;
  });

};

TermStore.__onDispatch = function(payload) {
  switch(payload.actionType){
    case(SearchConstants.RECEIVED_TERMS):
      resetTerms(payload.terms);
      break;
  }
  this.__emitChange();

};

module.exports = SearchStore;
