# This file is copied to spec/ when you run 'rails generate rspec:install'
ENV["RAILS_ENV"] ||= 'test'
require File.expand_path("../../config/environment", __FILE__)
require 'rspec/rails'
require 'database_cleaner'

Dir[Rails.root.join("spec/support/**/*.rb")].each {|f| require f}

RSpec.configure do |config|
  # Remove this line if you're not using ActiveRecord or ActiveRecord fixtures
  config.fixture_path = "#{::Rails.root}/spec/fixtures"

  config.infer_base_class_for_anonymous_controllers = false

  config.use_transactional_fixtures = false

  config.before :each do
    if Capybara.current_driver == :rack_test
      DatabaseCleaner.strategy = :transaction
    else
      DatabaseCleaner.strategy = :truncation
    end
    DatabaseCleaner.start
  end

  config.after do
    DatabaseCleaner.clean
  end
end
