module UserPresenceDelagation
  delegate :logged_in?, :current_user, to: :user_presence
end