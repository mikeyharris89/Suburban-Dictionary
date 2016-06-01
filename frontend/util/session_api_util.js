var SessionActions = require('../actions/session_actions');
var ErrorActions = require('../actions/error_actions');

var SessionApiUtil = {
  login: function(credentials) {
    $.ajax({
      type: 'POST',
      url: "/api/session/",
      data: {user: credentials},
      success: function(currentUser) {
        console.log("Successful login!");
        SessionActions.receiveCurrentUser(currentUser);
      },
      error: function (xhr) {
			  console.log("Login error in SessionApiUtil#login");
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
        console.log("Successful logout!");
        SessionActions.removeCurrentUser(currentUser);
      },
      error: function () {
			  console.log("Logout error in SessionApiUtil#logout");
			}
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
			  console.log("Error in SessionApiUtil#fetchCurrentUser");
			}

    });
  },

};

window.SessionApiUtil = SessionApiUtil;
module.exports = SessionApiUtil;
