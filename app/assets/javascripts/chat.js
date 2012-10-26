$(function(){

  var socketId = '';

  var Message = Backbone.Model.extend({
    defaults: function() {
      return {
        body: "",
        timestamp: Date.now(),
        author: window.currentUser,
        socket_id: socketId,
        order: Messages.nextOrder(),
      };
    }
  });

  var MessageList = Backbone.Collection.extend({
    model: Message,
    url: '/messages',

    nextOrder: function() {
      if (!this.length) return 1;
      return this.last().get('order') + 1;
    },

    comparator: function(todo) {
      return todo.get('order');
    }
  });

  window.Messages = new MessageList

  var MessageView = Backbone.View.extend({
    tagName: 'tr',
    model: Message,

    template: JST["app/views/message"],

    initialize: function() {
      this.model.bind('change', this.render, this);
    },

    render: function() {
      this.$el.addClass("message");
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    }
  });

  var AppView = Backbone.View.extend({
    el: $("#chat"),

    events: {
      "click #send-message": "sendMessage"
    },

    initialize: function() {
      this.input = this.$("#new-message")

      Messages.bind('add', this.addMessage, this);
      Messages.bind('reset', this.addMessages, this);
    },

    addMessages: function() {
      Messages.each(this.addMessage);
    },

    addMessage: function(message) {
      var view = new MessageView({model: message});
      this.$("#messages table").append(view.render().el);
    },

    sendMessage: function(e) {
      if (!this.input.val()) return;

      Messages.create({ body: this.input.val() });
      this.input.val('');
    }
  });

  window.App = new AppView;

  Pusher.log = function(message) {
    if (window.console && window.console.log) window.console.log(message);
  };

  // Flash fallback logging - don't include this in production
  WEB_SOCKET_DEBUG = true;

  var pusher = new Pusher('bcac71dd1645cc01110e');
  pusher.connection.bind('connected', function() {
    socketId = pusher.connection.socket_id;
  });

  var channel = pusher.subscribe('messages');
  channel.bind('new_message', function(data) {
    Messages.add(data);
  });
});