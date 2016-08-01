Confab.ParticipantListView = Backbone.View.extend({
  initialize: function() {
    participants.bind('add', this.addParticipant, this);
    participants.bind('remove', this.removeParticipant, this);
    participants.bind('reset', this.addParticipants, this);
  },

  addParticipants: function() {
    participants.each(_.bind(this.addParticipant, this));
  },

  addParticipant: function(participant) {
    var view = new Confab.ParticipantView({model: participant});
    this.$el.append(view.render().el);
  },

  removeParticipant: function(participant) {
    this.$("#participant_" + participant.id).remove();
  }
});


