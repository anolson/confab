require 'spec_helper'

describe "user signin" do
  it "displays the username after a successful login", type: :feature do
    user = FactoryGirl.create(:user)

    signin_user(user)

    expect(page).to have_selector(".username", :text => user.username)
  end
end
