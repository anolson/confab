$(function(){

  var socketId = '';

  var Participant = Backbone.Model.extend({
    defaults: function() {
      return { full_name: "" };
    }
  });

  var ParticipantList = Backbone.Collection.extend({
    model: Participant,

    nextOrder: function() {
      if (!this.length) return 1;
      return this.last().get('order') + 1;
    },

    comparator: function(participant) {
      return participant.get('full_name');
    }
  });

  window.Participants = new ParticipantList

  var ParticipantView = Backbone.View.extend({
    tagName: 'li',
    model: Participant,

    initialize: function() {
      this.model.bind('change', this.render, this);
    },

    render: function() {
      this.$el.attr('id', 'participant_' + this.model.id);
      this.$el.html(this.model.get('full_name'));
      return this;
    }
  });

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

    comparator: function(message) {
      return message.get('timestamp');
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
      "click #send-message": "sendMessage",
      "keyup #new-message": "sendMessageOnEnter"
    },

    initialize: function() {
      this.input = this.$("#new-message")

      this.input.focus();

      Messages.bind('add', this.addMessage, this);
      Messages.bind('reset', this.addMessages, this);

      Participants.bind('add', this.addParticipant, this);
      Participants.bind('remove', this.removeParticipant, this);
      Participants.bind('reset', this.addParticipants, this);
    },

    addMessages: function() {
      Messages.each(this.addMessage);
    },

    addMessage: function(message) {
      var view = new MessageView({model: message});
      $("#messages table").append(view.render().el);
    },

    sendMessage: function() {
      if (!this.input.val()) return;

      Messages.create({ body: this.input.val() });
      this.input.val("");
    },

    sendMessageOnEnter: function(e) {
      if (e.keyCode != 13) return;
      this.sendMessage();
    },

    addParticipants: function() {
      Participants.each(this.addParticipant);
    },

    addParticipant: function(participant) {
      var view = new ParticipantView({model: participant});
      $("#participants ul").append(view.render().el);
    },

    removeParticipant: function(participant) {
      $("#participant_" + participant.id).remove();
    }
  });

  window.App = new AppView;

  Pusher.log = function(message) {
    if (window.console && window.console.log) window.console.log(message);
  };

  // Flash fallback logging - don't include this in production
  WEB_SOCKET_DEBUG = true;

  window.pusher.connection.bind('connected', function() {
    socketId = pusher.connection.socket_id;
  });

  var message_channel = window.pusher.subscribe('messages');
  message_channel.bind('new_message', function(data) {
    Messages.add(data);
  });

  var participant_channel = window.pusher.subscribe('participants');
  participant_channel.bind('login', function(data) {
    Participants.add(data);
  });

  participant_channel.bind('logout', function(data) {
    Participants.remove(data);
  });
});