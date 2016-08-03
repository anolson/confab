class Confab.Message extends Backbone.Model
  defaults: ->
    body: ''
    timestamp: Date.now()
    author: Confab.currentUser
    socket_id: Confab.socketId
