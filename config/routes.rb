Rails.application.routes.draw do
  root "static_pages#root"

  namespace :api, defaults: {format: :json} do
    resources :users, only: [:create, :show]
    resource :session, only: [:create, :destroy, :show]
    resources :terms, only: [:create, :show, :index, :update, :destroy]
  end
  get 'api/like_names', to: 'api/terms#like_name_index'

end
