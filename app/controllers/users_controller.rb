class UsersController < ApplicationController
  skip_before_filter :ensure_current_user, :only => [:new, :create]

  def new
    @user = User.new
  end

  def create
    @user = User.create(params[:user])
    if @user.valid?
      presence.login! @user.id
      redirect_to messages_path
    else
      render :new
    end
  end

  private

  def presence
    @presence ||= Presence.new(user_session)
  end
end
