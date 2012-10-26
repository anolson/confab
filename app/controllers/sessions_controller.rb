class SessionsController < ApplicationController
  skip_before_filter :ensure_current_user, :only => [:new, :create]

  def new
    @user = User.new
  end

  def create
    if user = User.authenticate(params[:user])
      user.login!(session)

      redirect_to messages_path
    else
      redirect_to signin_path, :alert => "Incorrect username/password."
    end
  end

  def destroy
    reset_session
    current_user.logout!
    redirect_to signin_path
  end
end
