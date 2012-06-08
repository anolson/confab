require 'spec_helper'

describe 'chat messaging' do
  context "with javascript", :js => true do
    it 'displays the message back to they user that they just sent' do
      pending
      signin_user
    
      visit '/messages'
      fill_in 'new-message', :with => "Good Morning!!"
      click_button 'Send'
          
      page.should have_selector("table tr td.speaker strong", :text => "Andrew Olson")
      page.should have_selector("table tr td .body", :text => "Good Morning!")
    end
    
    it 'pushes messages to other users' do
      using_session :boonen do 
        signin_user FactoryGirl.create(:user, :username => 'boonen', :first_name => 'Tom', :last_name => 'Bonnen')
        visit '/messages'
      end
      
      using_session :cancellara do
        signin_user FactoryGirl.create(:user, :username => 'cancellara', :first_name => 'Fabian', :last_name => 'Cancellara')
        visit '/messages'
        fill_in 'new-message', :with => "Good Morning!!"
        click_button 'Send'
      end 

      using_session :boonen do 
        page.should have_selector("table tr td.speaker strong", :text => "Fabian Cancellara") 
        page.should have_selector("table tr td .body", :text => "Good Morning!")
      end
    end
  end
end