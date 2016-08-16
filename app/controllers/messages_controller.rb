class MessagesController < ApplicationController
  def index
    @messages = Message.order("timestamp DESC").limit(10).map(&:to_json)
    @participants = Session.all_logged_in_users.map(&:to_json)
  end

  def create
    current_user.messages.create(message_params).reload.push(params[:socket_id])
    render nothing: true, :status => :created
  end

  private

  def message_params
    params[:message]
  end
end
