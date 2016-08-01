//= require jquery
//= require jquery_ujs
//= require underscore
//= require backbone
//= require pusher
//= require moment.min

//= require_self

//= require app/templates/message

//= require app/models/message
//= require app/models/participant

//= require app/collections/messages
//= require app/collections/participants

//= require app/views/message
//= require app/views/message_table
//= require app/views/participant
//= require app/views/participant_list
//= require app/views/app

//= require chat

window.Confab = {
  socketId: "",
  currentUser: ""
}
