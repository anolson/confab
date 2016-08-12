class Message < ActiveRecord::Base
  attr_accessible :user, :body, :timestamp

  belongs_to :user

  def push(socket_id)
    push_notification.push(:new_message, to_json, socket_id)
  end

  def to_json
    { author: user.full_name, body: body, timestamp: timestamp }
  end

  def push_notification
    @push_notificataion ||= PushNotification.new('messages')
  end
end
