class Session < ActiveRecord::Base
  include UserPresenceDelagation

  def self.all_logged_in_users
    all.map do |session|
      session.current_user if session.logged_in?
    end
  end

  private

  def decoded_data
    Marshal.load(Base64.decode64(data))
  end

  def user_presence
    @user_presence ||= UserPresence.new(decoded_data.symbolize_keys!)
  end
end