class UserSession

  attr_accessor :session

  def initialize(session = {})
    self.session = session
  end

  def current_user=(user_id)
    session[:current_user] = user_id
  end

  def current_user
    @current_user ||= User.find_by_id(session[:current_user])
  end
end
