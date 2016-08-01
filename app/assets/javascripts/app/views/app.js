Confab.AppView = Backbone.View.extend({
  events: {
    "click #send-message": "sendMessage",
    "keyup #new-message": "sendMessageOnEnter"
  },

  initialize: function() {
    this.input = this.$("#new-message");
    this.input.focus();

    this.messageTableView = new Confab.MessageTableView({
      el: $("#messages table")
    });
    this.participantListView = new Confab.ParticipantListView({
      el: $("#participants ul")
    });
  },

  sendMessage: function() {
    if (!this.input.val()) return;

    messages.create({ body: this.input.val() });
    this.input.val("");
  },

  sendMessageOnEnter: function(e) {
    if (e.keyCode != 13) return;
    this.sendMessage();
  }
});
