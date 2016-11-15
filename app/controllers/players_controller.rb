class PlayersController < ApplicationController
	def index
    render_players
	end

  def create  
    player = Player.create(player_params)
    if player.save
      render_players
    else
      render :json =>{ :errors => player.errors.full_messages} , :status => 422
      
    end
  end

  def destroy
    Player.find(params[:id]).destroy
    render_players
  end

  private
    def player_params
      params.require(:player).permit(:first_name, :last_name, :team_id)
    end

    def render_players
      render :json => Player.all
    end


end
