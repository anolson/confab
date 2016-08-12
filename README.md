
## confab

Realtime group chat that uses Pusher, Backbone.js, and Rails.

### Getting started

#### Clone the source and install dependencies.

```
$ git clone git://github.com/anolson/confab.git
$ cd confab
$ bundle
$ rake db:setup
```

#### Configure Pusher

Signup for Pusher[http://pusher.com/]

```
$ export PUSHER_APP_ID=<your pusher api id>
$ export PUSHER_KEY=<your pusher key>
$ export PUSHER_SECRET=<your pusher secret>
```

(if you are using Pow[pow.cx] configure these with .powenv)

#### Start the server

```
$ bundle exec rails s
```

##### Run the tests

```
$ bundle exec rake spec
```

### Ideas

Some ideas of features to add.

* Mock interaction with Pusher
* Save timezone info for user
* Search messages
* Auto-detect URLs (imgur, youtube etc).
* Multiple room/conversation support
* Add support for Faye[http://faye.jcoglan.com/]
* Extract a REST api and create something with it (perhaps a chat bot).

### License

(The MIT License)

Copyright © 2012-2016 Andrew Olson.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the ‘Software’), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED ‘AS IS’, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
