var SessionActions = require('../actions/session_actions');
// var ErrorActions = require('./../actions/error_actions');

var UserApiUtil = {
  signup: function (formData) {
    $.ajax({
      url: '/api/users',
      type: 'POST',
      dataType: 'json',
      data: {user: formData},
      success: function (currentUser) {
        SessionActions.receiveCurrentUser(currentUser);
      },
      error: function () {
        console.log('UserApiUtil#createAccount error');
      }
    });
  }
};

module.exports = UserApiUtil;
window.UserApiUtil = UserApiUtil;
