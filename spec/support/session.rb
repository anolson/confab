module Support
  module Session
    def signin_user(user = nil)
      user = FactoryGirl.create(:user) unless user

      visit "/signin"
      fill_in "Username", :with => user.username
      fill_in "Password", :with => user.password
      click_button "Signin"

      user
    end
  end
end

RSpec.configure do |config|
  config.include Support::Session
end
