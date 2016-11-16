class SessionsController < ApplicationController
	def create
    puts "is this working"
	  user = User.find_by(:email => params[:email])
	  if user && user.authenticate(params[:password])
      session[:user_id] = user.id
      redirect_to "/nba"
	  else
      flash[:errors] = ['Invalid password or email']
      redirect_to :back
	  end
  end

  def destroy
    session[:user_id] = nil
    redirect_to "/"
  end
end
