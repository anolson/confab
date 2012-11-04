class UserPresence

  attr_accessor :session

  def initialize(session)
    self.session = session
  end

  def login!(user_id)
    session[:current_user] = user_id
    push(:login)
  end

  def logout!
    push(:logout)
  end

  def logged_in?
    current_user.present?
  end

  def current_user
    @current_user ||= User.find_by_id(session[:current_user])
  end

  private

  def to_json
    { full_name: current_user.full_name, id: current_user.id }
  end

  def push(action)
    Pusher['participants'].trigger(action, to_json)
  end
end