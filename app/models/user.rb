class User < ActiveRecord::Base
  has_secure_password
  attr_accessible :username, :first_name, :last_name, :password, :password_confirmation

  validates_presence_of :username, :first_name, :last_name, :password
  validates_confirmation_of :password

  validates_uniqueness_of :username

  has_many :messages

  scope :logged_in, where(logged_in: true)

  def full_name
    first_name + ' ' + last_name
  end

  def self.authenticate(options = {})
    User.find_by_username(options[:username]).try(:authenticate, options[:password])
  end

  def login!(session)
    update_column(:logged_in, true)
    session[:current_user] = self.id
  end

  def logout!
    update_column(:logged_in, false)
  end

  def to_json
    { full_name: full_name }
  end
end
