var AppDispatcher = require('../dispatcher/dispatcher'),
    TermConstants = require('../constants/term_constants');

var TermActions = {
  receiveAllTerms: function (terms) {

    AppDispatcher.dispatch({
      actionType: TermConstants.RECEIVED_TERMS,
      terms: terms
    });
  },

  receiveSingleTerm: function (term) {
    AppDispatcher.dispatch({
      actionType: TermConstants.RECEIVED_TERM,
      term: term
    });
  },

  removeTerm: function (term) {
    AppDispatcher.dispatch({
      actionType: TermConstants.RECEIVED_TERM,
      term: term
    });
  }
};

module.exports = TermActions;
