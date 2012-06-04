$(function(){
  
  var currentUser = "Andrew O."
  
  var Message = Backbone.Model.extend({
    defaults: function() {
      return {
        text: "",
        timestamp: Date.now(), 
        author: currentUser,
        order: Messages.nextOrder(),
      };
    }
  }); 
    
  var MessageList = Backbone.Collection.extend({
    model: Message,
    url: '/messages',
    
    nextOrder: function() {
      if (!this.length) return 1;
      return this.last().get('order') + 1;
    },
    
    comparator: function(todo) {
      return todo.get('order');
    }
  });
  
  var Messages = new MessageList 
  
  var MessageView = Backbone.View.extend({    
    tagName: 'tr',
    model: Message,
    
    template: _.template($('#message-template').html()),    
    
    initialize: function() {
      this.model.bind('change', this.render, this);
    },
    
    render: function() {
      this.$el.addClass("message");
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    }  
  });
  
  var AppView = Backbone.View.extend({
    el: $("#chat"),

    events: {
      "click #send-message": "sendMessage"
    },
  
    initialize: function() {
      this.input = this.$("#new-message")
      
      Messages.bind('add', this.addMessage, this);
    },
    
    addMessage: function(message) {
      var view = new MessageView({model: message});
      this.$("#messages table").append(view.render().el);
    },
    
    sendMessage: function(e) {
      if (!this.input.val()) return;
      
      Messages.add({text: this.input.val()});
      this.input.val('');
    }
  });
  

  window.App = new AppView;
});