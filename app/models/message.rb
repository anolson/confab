class Message < ActiveRecord::Base
  attr_accessible :author, :body, :timestamp
    
  def push(socket_id)
    Pusher['messages'].trigger('new_message', pusher_data, socket_id)
  end
  
  def pusher_data
    { author: author, body: body, timestamp: timestamp }
  end
end
