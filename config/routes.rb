Traces::Application.routes.draw do
  mount API::Traces => '/api'

  devise_for :users, :controllers => { :registrations => "registrations" }, :path_names => { :sign_up => "new" }
  devise_for :users, :controllers => { :session => "session" }

  resources :diaries
  resources :articles do
    resources :comments
  end
  resources :comments

  root :to => 'backbone#index'

  match '/drafts' => 'articles#drafts'
  match '/feed' => 'articles#feed'
  match '/sitemap' => 'sitemap#index'

  match "/:year((/:month(/:day))(/:slug))" => "articles#show_all",
  :constraints => { :year => /\d{4}/, :month => /0[1-9]|1[0-2]/, :day => /0[1-9]|1\d|2\d|3[0-1]/ }

  match "/:year(/:month)/:slug" => redirect("/:year((/:month(/:day))(/:slug))"),
  :constraints => { :year => /\d{4}/, :month => /0[1-9]|1[0-2]/, :slug => /\d{3,}|\D+/ }

  match '/users/signed_in_check' => 'backbone#signed_in_check'
end
