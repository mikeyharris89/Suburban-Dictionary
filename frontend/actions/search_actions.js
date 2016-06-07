var AppDispatcher = require('../dispatcher/dispatcher');
var SearchConstants = require('../constants/search_constants');

var SearchActions = {
  receiveTerms: function (terms) {
    AppDispatcher.dispatch({
      actionType: SearchConstants.RECEIVED_TERMS,
      terms: terms
    });
  },
};

module.exports = SearchActions;
