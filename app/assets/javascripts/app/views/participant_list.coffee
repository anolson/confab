class Confab.ParticipantListView extends Backbone.View
  initialize: ->
    participants.bind 'add', @addParticipant
    participants.bind 'remove', @removeParticipant
    participants.bind 'reset', @addParticipants

  addParticipants: =>
    participants.each _.bind(@addParticipant)

  addParticipant: (participant) =>
    view = new Confab.ParticipantView(model: participant)
    @$el.append view.render().el

  removeParticipant: (participant) =>
    @$("#participant_#{participant.id}").remove();


