class UsersController < ApplicationController
 def index
 end

 def create
	puts "is this working"
  user = User.new(user_params)
  if user.save
   session[:user_id] = user.id
   redirect_to "/nba"
  else
    flash[:errors] = user.errors.full_messages
   redirect_to :back
  end
 end

 private
  def user_params
   params.require(:user).permit(:name, :email, :password, :password_confirmation)
  end
end
