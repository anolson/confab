class MessagesController < ApplicationController
  def index; end
  
  def create
    Message.create(message_params).push(params[:socket_id])
    render nothing: true, :status => :created
  end
  
  private

  def message_params
    params.slice(:body, :timestamp).merge(:user => current_user)
  end
end
