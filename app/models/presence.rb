class Presence

  attr_accessor :user_session

  def initialize(user_session = UserSession.new)
    self.user_session = user_session
  end

  def login!(user_id)
    user_session.current_user = user_id
    push_notification.push(:login, current_user.to_json)
  end

  def logout!
    push_notification.push(:logout, current_user.to_json)
  end

  private

  def current_user
    user_session.current_user
  end

  def push_notification
    @push_notificataion ||= PushNotification.new('participants')
  end
end