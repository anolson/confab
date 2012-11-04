class Session < ActiveRecord::Base
  delegate :current_user, to: :user_presence

  def self.all_logged_in_users
    all.map(&:current_user).reject(&:nil?)
  end

  private

  def decoded_data
    Marshal.load(Base64.decode64(data))
  end

  def user_presence
    @user_presence ||= UserPresence.new(decoded_data.symbolize_keys!)
  end
end