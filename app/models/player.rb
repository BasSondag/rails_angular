class Player < ActiveRecord::Base
	belongs_to :team

	validates :first_name, :last_name, presence: true, length: { minimum: 2}
	validates :team, presence: true
	validates :first_name, uniqueness: { scope: [:last_name], case_sensitive: false  }
end
