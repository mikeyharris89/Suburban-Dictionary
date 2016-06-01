class Term < ActiveRecord::Base
  validates :name, :definition, :sentence, :user_id, presence: true
end
