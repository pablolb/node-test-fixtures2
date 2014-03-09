var Fixtures = require("../"),
    assert = require("chai").assert;


var FIXTURES_DIR = __dirname + "/fixtures";

describe("Fixtures module", function() {

    it("should fail if it cannot read the directory", function() {
        
        assert.throw(function() {
            var fixtures = new Fixtures(__dirname + "/i-dont-exits");
        });

    });

    it("should fail if it is not a directory", function() {
        
        assert.throw(function() {
            var fixtures = new Fixtures(__filename);
        });

    });

    it("should have sane defaults", function() {
        var fixtures = new Fixtures(FIXTURES_DIR);
        assert.equal(fixtures.options().envVar, "NODE_ENV", "Environment variable");
        assert.deepEqual(fixtures.options().dependencies, {}, "Dependencies");
    });

    it("should load fixtures from JSON files in base directory", function() {
        // no test/ fixture
        var fixtures = new Fixtures(FIXTURES_DIR);
        assert.deepEqual(fixtures.fixture1, {name: "John", lastName: "Doe"}, "fixture1");
    });

    it("should extend fixtures from JSON files in envdironment subdirectory, if it exists", function() {
        process.env.MYVAR = "env1";
        var fixtures = new Fixtures(FIXTURES_DIR, {envVar: "MYVAR"});
        assert.deepEqual(fixtures.fixture1, {name: "Jane", lastName: "Doe"}, "env1/fixture1");
    });

    it("should always read fresh fixtures from JSON files", function() {
        var fixtures = new Fixtures(FIXTURES_DIR);
        var firstRead = fixtures.fixture1;
        firstRead.name = "Foo";
        assert.deepEqual(fixtures.fixture1, {name: "John", lastName: "Doe"}, "Name should still be John");
    });

    it("should allow custom environment dependencies", function() {
        process.env.MYVAR = "env2";
        var fixtures = new Fixtures(FIXTURES_DIR, {
            envVar: "MYVAR",
            dependencies: {
                env2: "env1"
            }
        });
        assert.deepEqual(fixtures.fixture1, {name: "Jane", lastName: "Jones"}, "env2/fixture1");
    });

    it("should not catch syntax errors", function() {
        assert.throw(function() {
            var fixtures = new Fixtures(FIXTURES_DIR);
            fixtures.syntaxError;
        });
    });

    it("should load .js files as node modules", function() {
        var fixtures = new Fixtures(FIXTURES_DIR);
        assert.deepEqual(fixtures.moduleFixture, {foo: "bar"}, "/moduleFixture");
    });

    it("should use basedir if environment variable is not defined", function() {
        delete process.env.notdefined;
        var fixtures = new Fixtures(FIXTURES_DIR, {envVar: "notdefined"});
        assert.deepEqual(fixtures.fixture1, {name: "John", lastName: "Doe"}, "fixture1");
    });

});
