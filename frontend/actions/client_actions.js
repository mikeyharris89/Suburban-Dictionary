var TermApiUtil = require('../util/term_api_util'),
    SearchApiUtil = require('../util/search_api_util');

var ClientActions = {
  fetchTerms: function () {
    TermApiUtil.fetchTerms();
  },
  
  fetchForRandom: function (callback) {
    TermApiUtil.fetchForRandom(callback);
  },

  fetchLikeNameTerms: function(id) {
    TermApiUtil.fetchLikeNameTerms(id);
  },

  getTerm: function (id) {
    TermApiUtil.getTerm(id);
  },

  createTerm: function (data, closeModal) {
    TermApiUtil.createTerm(data, closeModal);
  },

  editTerm: function (data, closeModal) {
    TermApiUtil.updateTerm(data, closeModal);
  },

  deleteTerm: function (id) {
    TermApiUtil.deleteTerm(id);
  },

  fetchSearchTerms: function(input) {
    SearchApiUtil.fetchTerms(input);
  }
};

module.exports = ClientActions;
