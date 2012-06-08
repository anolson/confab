# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :user do
    first_name 'Tom'
    last_name 'Boonen'
    username 'boonen'
    password 'secret'
  end
end
