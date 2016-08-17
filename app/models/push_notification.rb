class PushNotification

  attr_accessor :channel

  def initialize(channel)
    self.channel = channel
  end

  def push(event, data, socket_id = nil)
    Pusher[channel].trigger(event, data, socket_id)
  end
end
