class ApplicationController < ActionController::Base
  protect_from_forgery
  before_filter :ensure_current_user

  delegate :current_user, to: :user_session
  helper_method :current_user

  def logged_in?
    current_user.present?
  end
  helper_method :logged_in?

  private

  def ensure_current_user
    redirect_to signin_path unless logged_in?
  end

  def user_session
    @user_session ||= UserSession.new(session)
  end
end
