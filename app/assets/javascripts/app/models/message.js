Confab.Message = Backbone.Model.extend({
  defaults: function() {
    return {
      body: "",
      timestamp: Date.now(),
      author: Confab.currentUser,
      socket_id: Confab.socketId
    };
  }
});
