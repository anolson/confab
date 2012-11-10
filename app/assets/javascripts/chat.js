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

    render: function() {
      this.$el.addClass("message");
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    }
  });

  var MessageTableView = Backbone.View.extend({
    el: $("#messages table"),

    initialize: function() {
      Messages.bind('add', this.addMessage, this);
      Messages.bind('reset', this.addMessages, this);
    },

    addMessages: function() {
      Messages.each(_.bind(this.addMessage, this));
    },

    addMessage: function(message) {
      var view = new MessageView({model: message});
      this.$el.append(view.render().el);
    }
  });

  var ParticipantListView = Backbone.View.extend({
    el: $("#participants ul"),

    initialize: function() {
      Participants.bind('add', this.addParticipant, this);
      Participants.bind('remove', this.removeParticipant, this);
      Participants.bind('reset', this.addParticipants, this);
    },

    addParticipants: function() {
      Participants.each(_.bind(this.addParticipant, this));
    },

    addParticipant: function(participant) {
      var view = new ParticipantView({model: participant});
      this.$el.append(view.render().el);
    },

    removeParticipant: function(participant) {
      this.$("#participant_" + participant.id).remove();
    }
  });

  var AppView = Backbone.View.extend({
    el: $("#chat"),

    events: {
      "click #send-message": "sendMessage",
      "keyup #new-message": "sendMessageOnEnter"
    },

    initialize: function() {
      this.input = this.$("#new-message");
      this.input.focus();

      this.messageTableView = new MessageTableView();
      this.participantListView = new ParticipantListView();
    },

    sendMessage: function() {
      if (!this.input.val()) return;

      Messages.create({ body: this.input.val() });
      this.input.val("");
    },

    sendMessageOnEnter: function(e) {
      if (e.keyCode != 13) return;
      this.sendMessage();
    }
  });

  window.App = new AppView;

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