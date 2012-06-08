module Support
  module Session
    def signin_user(user = nil)
      user = FactoryGirl.create(:user) unless user
      
      visit "/signin"
      fill_in "Username", :with => user.username
      fill_in "Password", :with => user.password
      click_button "Signin"

      page.should have_selector(".username", :text => user.username)
      user
    end
  end
end