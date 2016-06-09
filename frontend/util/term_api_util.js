var TermActions = require('../actions/term_actions'),
    ErrorActions = require('../actions/error_actions');

var TermApiUtil = {
  fetchTerms: function () {
    $.ajax({
      url: "api/terms",
      success: function (terms) {
        TermActions.receiveAllTerms(terms);
      }
    });
  },
  fetchLikeNameTerms: function(id) {
    $.ajax({
      url: "api/like_names",
      type: "GET",
      data: {id: id},
      success: function (terms) {
        TermActions.receiveAllTerms(terms);
      },
      error: function() {
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


  createTerm: function (data, closeModal) {
    $.ajax({
      url: "api/terms",
      type: "POST",
      contentType: false,
      processData: false,
      data: data,
      success: function (term) {
        TermActions.receiveSingleTerm(term);
        closeModal();
      },
      error: function (xhr) {

        var errors = xhr.responseJSON;
        ErrorActions.setErrors("create", errors);
      }
    });
  },

  updateTerm: function (data, closeModal) {
    $.ajax({
      url: "api/terms/" + parseInt(data.get("id")),
      type: "PATCH",
      contentType: false,
      processData: false,
      data: data,
      success: function (term) {
        TermActions.receiveSingleTerm(term);
        closeModal();
      },

      error: function(xhr) {
  
        var errors = xhr.responseJSON;
        ErrorActions.setErrors("update", errors);
      }
    });
  },
  // {term: {name: data.name, definition: data.definition, sentence: data.sentence}},

  deleteTerm: function (id) {
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
