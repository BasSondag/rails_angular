class Team < ActiveRecord::Base
	has_many :players

	validates :name,  presence: true, length: { minimum: 2}, uniqueness:  {case_sensitive: false} 


end
