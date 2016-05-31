var SessionActions = require('../actions/session_actions');


var SessionApiUtil = {
  login: function(credentials) {
    $.ajax({
      type: 'POST',
      url: "api/session/",
      data: {user: credentials},
      success: function(currentUser) {
        console.log("Successful login!");
        SessionActions.receiveCurrentUser(currentUser);
      },
      error: function() {
        console.log("Failed");
      }
    })
  },

  logout: function(){
    $.ajax({
      type: 'DELETE',
      url: "api/session/",
      success: function(currentUser) {
        console.log("Successful logout!");
        SessionActions.removeCurrentUser(currentUser);
      },
      error: function() {
        console.log("Failed");
      }
    })
  },

  fetchCurrentUser: function() {
    $.ajax({
      type: 'GET',
      url: "api/session/",
      success: function(user){
        SessionActions.receiveCurrentUser(currentUser);
      }

    })
  },

}

window.SessionApiUtil = SessionApiUtil;
module.exports = SessionApiUtil;
