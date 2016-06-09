class Term < ActiveRecord::Base
  validates :name, :definition, :sentence, :user_id, presence: true

  has_attached_file :image, default_url: "missing.png"
  validates_attachment_content_type :image, content_type: /\Aimage\/.*\Z/

  belongs_to :user

  def date
    month = self.created_at.strftime("%B")
    return "#{month[0..2].upcase} #{self.created_at.day}"
  end

  def date_string
    self.created_at.strftime('%b %d %Y')
  end
end
