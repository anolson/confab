class ApplicationController < ActionController::Base
  include UserPresenceDelagation

  protect_from_forgery
  before_filter :ensure_current_user

  delegate :logged_in?, :current_user, to: :user_presence
  helper_method :logged_in?, :current_user

  private

  def ensure_current_user
    redirect_to signin_path unless logged_in?
  end

  def user_presence
    @user_presence ||= UserPresence.new(session)
  end
end
