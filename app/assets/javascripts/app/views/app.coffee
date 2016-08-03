class Confab.AppView extends Backbone.View
  events:
    "click #send-message": "sendMessage"
    "keypress #new-message": "sendMessageOnEnter"
    "input #new-message": "onChange"

  initialize: =>
    @input = @$("#new-message")
    @input.focus()

    @messageTableView = new Confab.MessageTableView el: @$("#messages table")
    @participantListView = new Confab.ParticipantListView el: @$("#participants ul")

  sendMessage: =>
    return if @inputIsEmpty()

    messages.create(body: @input.val())
    @input.val("")

  sendMessageOnEnter: (event) =>
    return unless event.which is 13

    @sendMessage()

  onChange: (event) =>
    if @inputIsEmpty()
      @input.val("")
      event.stopPropagation()

  inputIsEmpty: =>
    @input.val().trim() is ""

