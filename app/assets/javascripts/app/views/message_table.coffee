class Confab.MessageTableView extends Backbone.View
  initialize: ->
    messages.bind 'add', @addMessage
    messages.bind 'reset', @addMessages

  addMessages: =>
    messages.each _.bind(@addMessage, this)

  addMessage: (message) =>
    view = new Confab.MessageView(model: message)
    @$el.append view.render().el
