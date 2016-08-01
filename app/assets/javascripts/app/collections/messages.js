Confab.MessageList = Backbone.Collection.extend({
  model: Confab.Message,
  url: '/messages',

  comparator: function(message) {
    return message.get('timestamp');
  }
});

window.messages = new Confab.MessageList;
