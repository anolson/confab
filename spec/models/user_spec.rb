require 'spec_helper'

describe User do
    
  context ".authenticate" do
    it "provides the corresponding user upon success" do
      FactoryGirl.create(:user)
      user = User.authenticate username: 'boonen', password: 'secret'
      user.should_not be_nil
      user.username.should == 'boonen'
    end    
  end
  
  context "#name" do
    it "creates a user's full name by concatenating their first and last name" do
      user = FactoryGirl.create(:user)
      user.full_name.should == "Tom Boonen"
    end
  end
end
