class Confab.ParticipantList extends Backbone.Collection
  model: Confab.Participant

  comparator: (participant) ->
    participant.get('full_name');

window.participants = new Confab.ParticipantList;
