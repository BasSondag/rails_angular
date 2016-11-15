class TeamsController < ApplicationController
	def index
    render_teams
  end

  def create
   team = Team.create(team_params)
    if team.save
      render_teams
    else
      render :json => { :errors => team.errors.full_messages} , :status => 422
    end
  end

  def destroy
    Team.find(params[:id]).destroy
    render_teams
  end

  def show
    render_team
  end

  private
    def team_params
      params.require(:team).permit(:name)
    end

    def render_teams
      render :json => Team.all
    end
    
    def render_team
      render :json => Team.find(params[:id]).players.all
    end
end
 