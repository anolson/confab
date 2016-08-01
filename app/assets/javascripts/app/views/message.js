Confab.MessageView = Backbone.View.extend({
  tagName: 'tr',
  model: Confab.Message,

  template: JST["app/templates/message"],

  render: function() {
    this.$el.addClass("message");
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  }
});
