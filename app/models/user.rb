class User < ActiveRecord::Base
  validates :username, :session_token, :password_digest, presence: true
  validates :username, uniqueness: true
  attr_reader :password

  after_initialize :ensure_session_token
  
  def self.find_by_session_token(username, password)
    user = User.find_by(username: username)
    return nil is user.nil?
    user.is_password?(password) ? user : nil
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def password=(password)
    @password = password
    this.password_digest = BCrypt::Password.create(password)

  end

  def reset_session_token!
    self.session_token = SecureRandom.urlsafe_base64(16)
  end

  private

  def ensure_session_token
    self.session_token ||= SecureRandom.urlsafe_base64(16)
  end
end
