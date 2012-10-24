class UsersController < ApplicationController
  skip_before_filter :ensure_current_user, :only => [:new, :create]
  layout 'fixed'

  def new
    @user = User.new
  end

  def create
    @user = User.create(params[:user])
    if @user.valid?
      session[:current_user] = @user.id
      redirect_to messages_path
    else
      render :new
    end
  end
end
