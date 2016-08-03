class Confab.ParticipantView extends Backbone.View
  tagName: 'li'
  model: Confab.Participant

  initialize: ->
    @model.bind 'change', @render

  render: =>
    @$el.attr 'id', "participant_#{@model.id}"
    @$el.html @model.get('full_name')
    @ # return this
