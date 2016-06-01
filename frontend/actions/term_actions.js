var AppDispatcher = require('../dispatcher/dispatcher'),
    TermConstants = require('../constants/term_constants');

var TermActions = {
  receiveAllTerms: function (terms) {
    Dispatcher.dispatch({
      actionType: TermConstants.TERMS_RECEIVED,
      terms: terms
    });
  },

  receiveSingleTerm: function (term) {
    Dispatcher.dispatch({
      actionType: TermConstants.TERM_RECEIVED,
      term: term
    });
  },

  removeTerm: function (term) {
    Dispatcher.dispatch({
      actionType: TermConstants.TERM_RECEIVED,
      term: term
    });
  }
};

module.exports = TermActions;
