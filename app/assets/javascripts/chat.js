$(function(){

  // var Participant = Backbone.Model.extend({
  //   defaults: function() {
  //     return { full_name: "" };
  //   }
  // });

  // var ParticipantList = Backbone.Collection.extend({
  //   model: Confab.Participant,

  //   comparator: function(participant) {
  //     return participant.get('full_name');
  //   }
  // });

  // window.Participants = new ParticipantList

  // Confab.ParticipantView = Backbone.View.extend({
  //   tagName: 'li',
  //   model: Confab.Participant,

  //   initialize: function() {
  //     this.model.bind('change', this.render, this);
  //   },

  //   render: function() {
  //     this.$el.attr('id', 'participant_' + this.model.id);
  //     this.$el.html(this.model.get('full_name'));
  //     return this;
  //   }
  // });

  // var Message = Backbone.Model.extend({
  //   defaults: function() {
  //     return {
  //       body: "",
  //       timestamp: Date.now(),
  //       author: window.currentUser,
  //       socket_id: socketId
  //     };
  //   }
  // });

  // var MessageList = Backbone.Collection.extend({
  //   model: Confab.Message,
  //   url: '/messages',

  //   comparator: function(message) {
  //     return message.get('timestamp');
  //   }
  // });

  // window.Messages = new MessageList

  // Confab.MessageView = Backbone.View.extend({
  //   tagName: 'tr',
  //   model: Confab.Message,

  //   template: JST["app/templates/message"],

  //   render: function() {
  //     this.$el.addClass("message");
  //     this.$el.html(this.template(this.model.toJSON()));
  //     return this;
  //   }
  // });

  // Confab.MessageTableView = Backbone.View.extend({
  //   el: $("#messages table"),

  //   initialize: function() {
  //     messages.bind('add', this.addMessage, this);
  //     messages.bind('reset', this.addMessages, this);
  //   },

  //   addMessages: function() {
  //     messages.each(_.bind(this.addMessage, this));
  //   },

  //   addMessage: function(message) {
  //     var view = new Confab.MessageView({model: message});
  //     this.$el.append(view.render().el);
  //   }
  // });

  // Confab.ParticipantListView = Backbone.View.extend({
  //   el: $("#participants ul"),

  //   initialize: function() {
  //     console.log("ParticipantListView init --> " + participants.length);
  //     participants.bind('add', this.addParticipant, this);
  //     participants.bind('remove', this.removeParticipant, this);
  //     participants.bind('reset', this.addParticipants, this);
  //   },

  //   addParticipants: function() {
  //     participants.each(_.bind(this.addParticipant, this));
  //   },

  //   addParticipant: function(participant) {
  //     var view = new Confab.ParticipantView({model: participant});
  //     this.$el.append(view.render().el);
  //   },

  //   removeParticipant: function(participant) {
  //     this.$("#participant_" + participant.id).remove();
  //   }
  // });

  // Confab.AppView = Backbone.View.extend({
  //   el: $("#chat"),

  //   events: {
  //     "click #send-message": "sendMessage",
  //     "keyup #new-message": "sendMessageOnEnter"
  //   },

  //   initialize: function() {
  //     this.input = this.$("#new-message");
  //     this.input.focus();

  //     this.messageTableView = new Confab.MessageTableView();
  //     this.participantListView = new Confab.ParticipantListView();
  //   },

  //   sendMessage: function() {
  //     if (!this.input.val()) return;

  //     messages.create({ body: this.input.val() });
  //     this.input.val("");
  //   },

  //   sendMessageOnEnter: function(e) {
  //     if (e.keyCode != 13) return;
  //     this.sendMessage();
  //   }
  // });


  window.App = new Confab.AppView({
    el: $("#chat")
  });

  window.pusher.connection.bind('connected', function() {
    Confab.socketId = pusher.connection.socket_id;
  });

  var messageChannel = window.pusher.subscribe('messages');
  messageChannel.bind('new_message', function(data) {
    messages.add(data);
  });

  var participantChannel = window.pusher.subscribe('participants');
  participantChannel.bind('login', function(data) {
    participants.add(data);
  });

  participantChannel.bind('logout', function(data) {
    participants.remove(data);
  });
});
