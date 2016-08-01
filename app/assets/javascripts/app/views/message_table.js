Confab.MessageTableView = Backbone.View.extend({
  initialize: function() {
    messages.bind('add', this.addMessage, this);
    messages.bind('reset', this.addMessages, this);
  },

  addMessages: function() {
    messages.each(_.bind(this.addMessage, this));
  },

  addMessage: function(message) {
    var view = new Confab.MessageView({model: message});
    this.$el.append(view.render().el);
  }
});
