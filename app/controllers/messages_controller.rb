class MessagesController < ApplicationController
  def index
    @messages = Message.order(:timestamp).limit(10).map(&:to_json)
  end

  def create
    Message.create(message_params).push(params[:socket_id])
    render nothing: true, :status => :created
  end

  private

  def message_params
    params.slice(:body, :timestamp).merge(:user => current_user)
  end
end
