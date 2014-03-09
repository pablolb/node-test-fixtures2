# test-fixtures

A simple but flexible fixtures module for your tests.

Inspired by the [fixtures](https://www.npmjs.org/package/node-fixtures) and [config](https://www.npmjs.org/package/config) modules,
it features the following:

* <b>Environment aware</b>. Running the code in NODE_ENV=env will extend the fixtures with the ones in env subdirectory.
* <b>Always read fresh fixtures</b>. Every time you use fixtures.namedFixture, it reads them again. Simplifies tear-down.
* <b>Simple inheritance/extension of environments</b>.  Allows you to specify simple dependencies.
* <b>Both JSON and JavaScript formats</b>. Allows you to define fixtures as modules. Use as your own risk, and beware that if your modules are singletons, they will be cached by node (no more "always read fresh fixtures").

## Basic usage
To load the fixture named validUser, from test/fixtures/validUser.json:

    var Fixtures = require("test-fixtures");
    var fixtures = new Fixtures(__dirname + "/test/fixtures");

    console.log(fixtures.validUser);

Please look at the files in the [examples](examples) directory.

When used with the defaults:

    node examples/basic.js
    { email: 'john.doe@example.com', password: 'secret' }
    undefined

When used with qa environment:

    NODE_ENV=qa node examples/basic.js 
    { email: 'john.doe@example.com', password: 'QA-secret' }
    { email: 'jane.doe@example.com', password: 'supersecret' }

When using the not-so-basic example in prod environment:

    NODE_ENV=prod node examples/not_so_basic.js 
    { email: 'john.prod@example.com', password: 'QA-secret' }
    { email: 'jane.doe@example.com', password: 'supersecret' }

## Options
You can pass the following options as a second argument in the constructor:

* <b>envVar</b>: Defaults to NODE_ENV.  Extend fixtures in base directory with fixtures in process.env[envVar] subdirectory.
* <b>dependencies</b>: Defaults to {}.  Allows you to define custom environment dependencies.  Useful if you have similar environments where one extends the other (for example staging is based on production), then you can use:

    var fixtures = new Fixtures(basedir, {dependencies: staging: "production"});

And only override the required production fixtures in your staging subdirectory.

## License

The MIT License (MIT)

Copyright (c) <year> <copyright holders>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

