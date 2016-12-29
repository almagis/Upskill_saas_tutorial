class ProfilesController < ApplicationController
  
  # GET to /users/:user_id/profile/new
  def new
    #render blank profile details page
    @profile = Profile.new
  end
end