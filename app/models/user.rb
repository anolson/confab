class User < ActiveRecord::Base
  has_secure_password
  attr_accessible :username, :first_name, :last_name, :password
  
  def full_name
    first_name + last_name
  end
  
  def self.authenticate(options = {})    
    User.find_by_username(options[:username]).try(:authenticate, options[:password])
  end
end
