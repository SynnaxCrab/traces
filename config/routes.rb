Traces::Application.routes.draw do
  mount API::Traces => '/api'

  devise_for :users

  resources :diaries
  resources :articles do
    resources :comments
  end
  resources :comments

  root :to => 'backbone#index'

  get '/drafts' => 'articles#drafts'
  get '/feed' => 'articles#feed'
  get '/sitemap' => 'sitemap#index'

  get "/:year((/:month(/:day))(/:slug))" => "articles#show_all",
  :constraints => { :year => /\d{4}/, :month => /0[1-9]|1[0-2]/, :day => /0[1-9]|1\d|2\d|3[0-1]/ }

  get "/:year(/:month)/:slug" => redirect("/:year((/:month(/:day))(/:slug))"),
  :constraints => { :year => /\d{4}/, :month => /0[1-9]|1[0-2]/, :slug => /\d{3,}|\D+/ }

  get '/users/signed_in_check' => 'backbone#signed_in_check'
end
