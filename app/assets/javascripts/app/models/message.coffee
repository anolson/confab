class Confab.Message extends Backbone.Model
  defaults: ->
    timestamp: Date.now()
    author: Confab.currentUser
    socket_id: Confab.socketId
