var Fixtures = require("../"),
    fixtures = new Fixtures(__dirname + "/fixtures", {dependencies: {prod: "qa"}});


console.log(fixtures.validUser);
console.log(fixtures.anotherUser);
