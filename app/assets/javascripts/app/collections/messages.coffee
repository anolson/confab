class Confab.MessageList extends Backbone.Collection
  model: Confab.Message
  url: '/messages'

  comparator: (message) ->
    message.get('timestamp')

window.messages = new Confab.MessageList;
