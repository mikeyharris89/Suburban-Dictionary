var TermActions = require('../actions/term_actions');

var TermApiUtil = {
  fetchTerms: function () {
    $.ajax({
      url: "api/terms",
      success: function (terms) {
        TermActions.receiveAllTerms(terms);
      }
    });
  },
  fetchLikeNameTerms: function(name) {
    debugger
    $.ajax({
      url: "api/like_names",
      type: "GET",
      data: {name: name},
      success: function (terms) {
        debugger
        TermActions.receiveAllTerms(terms);
      },
      error: function() {
        console.log("uh-ohhhhh");
      }
    });
  },
  getTerm: function (id) {
    $.ajax({
      url: "api/terms/" + id,
      success: function (term) {
        TermActions.receiveSingleTerm(term);
      }
    });
  },


  createTerm: function (data) {
    $.ajax({
      url: "api/terms",
      type: "POST",
      data: {term: data},
      success: function (term) {
        TermActions.receiveSingleTerm(term);
      }
    });
  },

  updateTerm: function (data) {
    $.ajax({
      url: "api/terms/" + data.id,
      type: "PATCH",
      data: {term: {name: data.name, definition: data.definition, sentence: data.sentence}},
      success: function (term) {
        TermActions.receiveSingleTerm(term);
      }
    });
  },

  destroyTerm: function (id) {
    $.ajax({
      url: "api/terms/" + id,
      type: 'DELETE',
      success: function (term) {
        TermActions.removeTerm(term);
      }
    });
  },
};

module.exports = TermApiUtil;
