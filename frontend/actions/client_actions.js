var TermApiUtil = require('../util/term_api_util');

var ClientActions = {
  fetchPosts: function () {
    TermApiUtil.fetchPosts();
  },

  getPost: function (id) {
    TermApiUtil.getPost(id);
  },

  createPost: function (data) {
    TermApiUtil.createPost(data);
  },

  editPost: function (data) {
    TermApiUtil.updatePost(data);
  },

  deletePost: function (id) {
    TermApiUtil.deletePost(id);
  }
};

module.exports = ClientActions;
