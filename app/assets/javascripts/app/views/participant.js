Confab.ParticipantView = Backbone.View.extend({
  tagName: 'li',
  model: Confab.Participant,

  initialize: function() {
    this.model.bind('change', this.render, this);
  },

  render: function() {
    this.$el.attr('id', 'participant_' + this.model.id);
    this.$el.html(this.model.get('full_name'));
    return this;
  }
});
