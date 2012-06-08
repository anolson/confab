class ApplicationController < ActionController::Base
  protect_from_forgery
  before_filter :ensure_current_user
  
  def ensure_current_user
    redirect_to signin_path unless logged_in?
  end
  
  def logged_in?
    !current_user.nil?
  end
  helper_method :logged_in?
  
  def current_user
    @current_user ||= User.find_by_id(session[:current_user])
  end
  helper_method :current_user
end
