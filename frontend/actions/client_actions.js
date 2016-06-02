var TermApiUtil = require('../util/term_api_util');

var ClientActions = {
  fetchTerms: function () {
    TermApiUtil.fetchTerms();
  },

  getTerm: function (id) {
    TermApiUtil.getTerm(id);
  },

  createTerm: function (data) {
    TermApiUtil.createTerm(data);
  },

  editTerm: function (data) {
    TermApiUtil.updateTerm(data);
  },

  deleteTerm: function (id) {
    TermApiUtil.deleteTerm(id);
  }
};

module.exports = ClientActions;
