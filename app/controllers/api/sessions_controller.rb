class Api::SessionsController < ApplicationController
  # before_action :require_user

  def create
    @user = User.find_by_credentials(
      params[:user][:username],
      params[:user][:password]
    )
    if @user
      login(@user)
      render "api/users/show"
    else
      @errors = ['invalid credentials']
      render "api/shared/errors", status: 422
    end
  end

  def show
    if current_user
      @user = current_user
      render "api/users/show"
    else
      render json: {}
    end

  end


  def destroy
    @user = current_user
    if @user
      render "api/users/show"
    else
      @errors = ['no one logged in']
      render "api/shared/errors", status: 404
    end

  end


end
