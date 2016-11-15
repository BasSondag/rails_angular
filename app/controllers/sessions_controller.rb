class SessionsController < ApplicationController
	def create
    puts "is this working"
	  user = User.find_by(:email => params[:email])
	  if user && user.authenticate(params[:password])
      session[:user_id] = user.id
      redirect_to "/nba"
	  else
      redirect_to :back
	  end
  end
end
