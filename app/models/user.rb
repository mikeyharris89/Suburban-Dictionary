class User < ActiveRecord::Base
  validates :username, :session_token, presence: true
  validates :username, uniqueness: true
   
  attr_reader :password

  after_initialize :ensure_session_token, :password_validates
  has_many :terms

  def password_validates
    unless self.password_digest || self.facebook_uid
    flash[:errors] = "Must provide password"
    end
  end

  def self.find_by_credentials(username, password)
    user = User.find_by(username: username)
    return nil if user.nil?
    user.is_password?(password) ? user : nil
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)

  end

  def reset_session_token!
    self.session_token = SecureRandom.urlsafe_base64(16)
    self.save!
    self.session_token
  end

  def self.find_or_create_from_auth_hash(auth_hash)
   user = User.find_by(facebook_uid: auth_hash[:uid])

   if user.nil?
     user = User.create!(
       facebook_uid: auth_hash[:uid],
       username: "#{auth_hash[:info][:first_name]} #{auth_hash[:info][:last_name]}"
     )
   end

   user
 end


  private

  def ensure_session_token
    self.session_token ||= SecureRandom.urlsafe_base64(16)
  end
end
