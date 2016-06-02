class Term < ActiveRecord::Base
  validates :name, :definition, :sentence, :user_id, presence: true
  belongs_to :user

  def date
    month = self.created_at.strftime("%B")
    return "#{month[0..2].upcase} #{self.created_at.day}"
  end

  def date_string
    self.created_at.strftime('%b %d %Y')
  end
end
