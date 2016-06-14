class Api::SessionsController < ApplicationController

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

  def omni_create
    @user = User.find_or_create_from_auth_hash(auth_hash)
    login(@user)
    redirect_to '/'
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
      logout
      render "api/terms/index"
    else
      @errors = ['no one logged in']
      render "api/shared/errors", status: 404
    end

  end

  protected
  def auth_hash
    request.env['omniauth.auth']
  end

end
