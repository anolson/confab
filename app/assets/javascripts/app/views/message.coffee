class Confab.MessageView extends Backbone.View
  tagName: 'tr'
  model: Confab.Message
  template: JST["app/templates/message"]

  render: ->
    @$el.addClass("message")
    @$el.html(this.template(this.model.toJSON()))
    @ # return this
