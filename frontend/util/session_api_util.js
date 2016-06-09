var SessionActions = require('../actions/session_actions');
var ErrorActions = require('../actions/error_actions');

var SessionApiUtil = {
  login: function(credentials) {
    $.ajax({
      type: 'POST',
      url: "/api/session/",
      data: {user: credentials},
      success: function(currentUser) {
        SessionActions.receiveCurrentUser(currentUser);
      },
      error: function (xhr) {
        var errors = xhr.responseJSON;
	      ErrorActions.setErrors("login", errors);
			}
    });
  },

  logout: function(){
    $.ajax({
      type: 'DELETE',
      url: "/api/session/",

      success: function(currentUser) {
        SessionActions.removeCurrentUser(currentUser);
      },
    });
  },

  fetchCurrentUser: function() {
    $.ajax({
      type: 'GET',
      url: "/api/session/",
      success: function(user){
        SessionActions.receiveCurrentUser(user);
      },
      error: function (xhr) {
			}

    });
  },

};

window.SessionApiUtil = SessionApiUtil;
module.exports = SessionApiUtil;
