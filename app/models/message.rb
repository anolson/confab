class Message < ActiveRecord::Base
  attr_accessible :user, :body, :timestamp

  belongs_to :user

  def push(socket_id)
    Pusher['messages'].trigger('new_message', pusher_data, socket_id)
  end
  
  def pusher_data
    { author: user.full_name, body: body, timestamp: timestamp }
  end
end
