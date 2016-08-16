require 'spec_helper'

describe 'chat messaging', type: :feature, js: true do
  context "with javascript" do
    it 'displays a message back to the user' do
      signin_user

      visit '/messages'
      fill_in 'new-message', :with => "Good Morning!!"
      trigger_keypress

      page.should have_selector("table tr td.speaker strong", :text => "Tom Boonen")
      page.should have_selector("table tr td .body", :text => "Good Morning!")
    end

    it 'displays messages to other users' do
      using_session :boonen do
        signin_user FactoryGirl.create(:user, :username => 'boonen', :first_name => 'Tom', :last_name => 'Bonnen')
        visit '/messages'
      end

      using_session :cancellara do
        signin_user FactoryGirl.create(:user, :username => 'cancellara', :first_name => 'Fabian', :last_name => 'Cancellara')
        visit '/messages'
        fill_in 'new-message', :with => "Good Morning!!"
        trigger_keypress
      end

      using_session :boonen do
        reload_page

        page.should have_selector("table tr td.speaker strong", :text => "Fabian Cancellara")
        page.should have_selector("table tr td .body", :text => "Good Morning!")
      end
    end
  end
end

def trigger_keypress
  page.execute_script('var e = jQuery.Event("keypress", { which: 13 }); $("#new-message").trigger(e)')
end

def reload_page
  page.execute_script("window.location.reload()")
end
