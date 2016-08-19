require 'spec_helper'

describe User do

  context ".authenticate" do
    let!(:user) { FactoryGirl.create(:user)}

    it "returns the corresponding user upon success" do
      authentic_user = User.authenticate username: 'boonen', password: 'secret'

      expect(authentic_user).to_not be_nil
      expect(authentic_user.username).to eq('boonen')
    end

    it "returns false upon failure" do
      unauthentic_user = User.authenticate username: 'boonen', password: 'wat'

      expect(unauthentic_user).to be_falsey
    end
  end

  context "#full_name" do
    let(:user) { FactoryGirl.build(:user) }

    it "returns a user's full name by concatenating their first and last name" do
      expect(user.full_name).to eq('Tom Boonen')
    end
  end
end
