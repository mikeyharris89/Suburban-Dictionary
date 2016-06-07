var SearchActions = require('../actions/search_actions');

var SearchApiUtil = {
  fetchTerms: function (input) {
    $.ajax({
      url: '/api/search_terms',
      data: {input: input},
      success: function (terms) {
        SearchActions.receiveTerms(terms);
      },
    });
  }
};

module.exports = SearchApiUtil;
