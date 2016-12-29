Rails.application.routes.draw do
  root to: 'pages#home' #Home page
  devise_for :users, controllers: { registrations: 'users/registrations' } #User registration - Devise
  resources :users do #Nested resource for profile pages
    resource :profile
  end
  get 'about', to: 'pages#about' #About page
  resources :contacts, only: :create #Contacts page
  get 'contact-us', to: 'contacts#new', as: 'new_contact' #Re-route contact to usable URL
end
