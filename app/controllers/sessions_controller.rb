class SessionsController < ApplicationController
  skip_before_filter :ensure_current_user, :only => [:new, :create]

  def new
    @user = User.new
  end

  def create
    if user = User.authenticate(params[:user])
      user_presence.login! user.id
      redirect_to messages_path
    else
      redirect_to signin_path, :alert => "Incorrect username/password."
    end
  end

  def destroy
    reset_session
    user_presence.logout!
    redirect_to signin_path
  end
end
