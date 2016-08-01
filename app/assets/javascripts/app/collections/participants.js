Confab.ParticipantList = Backbone.Collection.extend({
  model: Confab.Participant,

  comparator: function(participant) {
    return participant.get('full_name');
  }
});

window.participants = new Confab.ParticipantList;
