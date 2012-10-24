confab
======

Realtime group chat that uses Pusher, Backbone.js, and Rails.

== Getting started

Clone the source and install dependencies.

  $ git clone git://github.com/anolson/confab.io.git
  $ cd confab
  $ bundle
  $ rake db:setup

Signup for Pusher[http://pusher.com/]

Configure your Pusher API key.

  $ export PUSHER_APP_ID=<your pusher api id>
  $ export PUSHER_KEY=<your pusher key>
  $ export PUSHER_SECRET=<your pusher secret>

(if you are using Pow[pow.cx] put these in .powenv)

Start the server.

  $ bundle exec rails s

Run the tests.

  $ bundle exec rake spec

=== Ideas

Some ideas of features to add.

- Update Bootstrap/Rails
- Use Guard for running specs
- Mock interaction with Pusher
- Participant list (with presence pushed to the client)
- Search messages
- Auto-detect URLs (imgur, youtube etc).
- Multiple room/conversation support
- Add support for Faye[http://faye.jcoglan.com/]
- Extract a REST api and create something with it (perhaps a chat bot).
- Extract some part of the app into an engine