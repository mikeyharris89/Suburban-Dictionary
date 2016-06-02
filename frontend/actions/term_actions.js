var AppDispatcher = require('../dispatcher/dispatcher'),
    TermConstants = require('../constants/term_constants');

var TermActions = {
  receiveAllTerms: function (terms) {
    AppDispatcher.dispatch({
      actionType: TermConstants.TERMS_RECEIVED,
      terms: terms
    });
  },

  receiveSingleTerm: function (term) {
    AppDispatcher.dispatch({
      actionType: TermConstants.TERM_RECEIVED,
      term: term
    });
  },

  removeTerm: function (term) {
    AppDispatcher.dispatch({
      actionType: TermConstants.TERM_RECEIVED,
      term: term
    });
  }
};

module.exports = TermActions;
